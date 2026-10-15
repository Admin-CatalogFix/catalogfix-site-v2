// Generates the CatalogFix "links" QR codes, then decodes them to prove they work.
//
// Run from anywhere:   swift scripts/make-qr.swift
// Needs only a Mac with Xcode Command Line Tools — no packages to install.
// If the destination ever changes, edit `targetURL` below and run it again.

import AppKit
import CoreImage
import Foundation
import ImageIO
import UniformTypeIdentifiers
import Vision

// MARK: Settings

let targetURL = "https://catalogfix.com/links?src=qr"
let navyHex = "#223F5A"                       // Medium Navy (brand)
let quietZone = 4                             // white border, in modules (QR minimum is 4)
let pngSide = 1000                            // PNG width and height in pixels
let iconBoxModules = 7                        // centre box for the icon version, in modules

let repoRoot = URL(fileURLWithPath: #filePath).deletingLastPathComponent().deletingLastPathComponent()
let outputDir = repoRoot.appendingPathComponent("docs/qr")
let iconURL = repoRoot.appendingPathComponent("docs/assets/logo-icon.png")

let navy = CGColor(red: 0x22 / 255.0, green: 0x3F / 255.0, blue: 0x5A / 255.0, alpha: 1)
let white = CGColor(red: 1, green: 1, blue: 1, alpha: 1)

func fail(_ message: String) -> Never {
    FileHandle.standardError.write(Data((message + "\n").utf8))
    exit(1)
}

// MARK: 1. Encode the URL at error-correction level H and read back the module grid

guard let filter = CIFilter(name: "CIQRCodeGenerator") else { fail("QR generator not available") }
filter.setValue(Data(targetURL.utf8), forKey: "inputMessage")
filter.setValue("H", forKey: "inputCorrectionLevel")
guard let qrImage = filter.outputImage,
      let qrCG = CIContext().createCGImage(qrImage, from: qrImage.extent) else { fail("QR generation failed") }

let rawW = qrCG.width, rawH = qrCG.height
var raw = [UInt8](repeating: 255, count: rawW * rawH)
raw.withUnsafeMutableBytes { buffer in
    let ctx = CGContext(data: buffer.baseAddress, width: rawW, height: rawH, bitsPerComponent: 8,
                        bytesPerRow: rawW, space: CGColorSpaceCreateDeviceGray(),
                        bitmapInfo: CGImageAlphaInfo.none.rawValue)!
    ctx.draw(qrCG, in: CGRect(x: 0, y: 0, width: rawW, height: rawH))
}

// The generator's output is one pixel per module, possibly with its own margin: crop to the dark modules.
var minX = rawW, minY = rawH, maxX = -1, maxY = -1
for y in 0..<rawH { for x in 0..<rawW where raw[y * rawW + x] < 128 {
    minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y)
} }
let size = maxX - minX + 1
guard size == maxY - minY + 1, size >= 21, (size - 21) % 4 == 0 else { fail("Unexpected QR size \(size)") }
let modules: [[Bool]] = (0..<size).map { r in (0..<size).map { c in raw[(minY + r) * rawW + (minX + c)] < 128 } }
let total = size + 2 * quietZone
let version = (size - 21) / 4 + 1

// Centre box (same position for SVG and PNG), aligned to the module grid
let boxStart = quietZone + (size - iconBoxModules) / 2

// MARK: 2. SVG (vector, for print)

func makeSVG(withIcon: Bool) -> String {
    var d = ""
    for r in 0..<size {
        var c = 0
        while c < size {
            guard modules[r][c] else { c += 1; continue }
            var end = c
            while end < size && modules[r][end] { end += 1 }
            d += "M\(c + quietZone) \(r + quietZone)h\(end - c)v1h-\(end - c)z"
            c = end
        }
    }
    var icon = ""
    if withIcon {
        guard let iconData = try? Data(contentsOf: iconURL),
              let src = CGImageSourceCreateWithData(iconData as CFData, nil),
              let iconCG = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fail("Can't read \(iconURL.path)") }
        let pad = 0.6
        let w = Double(iconBoxModules) - 2 * pad
        let h = w * Double(iconCG.height) / Double(iconCG.width)
        let x = Double(boxStart) + pad
        let y = Double(boxStart) + (Double(iconBoxModules) - h) / 2
        icon = """
        <rect x="\(boxStart)" y="\(boxStart)" width="\(iconBoxModules)" height="\(iconBoxModules)" rx="1.2" fill="#FFFFFF"/>
        <image x="\(x)" y="\(y)" width="\(w)" height="\(h)" href="data:image/png;base64,\(iconData.base64EncodedString())"/>

        """
    }
    return """
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \(total) \(total)" width="1000" height="1000" shape-rendering="crispEdges">
    <title>CatalogFix links: \(targetURL)</title>
    <rect width="\(total)" height="\(total)" fill="#FFFFFF"/>
    <path fill="\(navyHex)" d="\(d)"/>
    \(icon)</svg>

    """
}

// MARK: 3. PNG (1000 x 1000, for decks, proposals, email)

func makePNG(withIcon: Bool) -> CGImage {
    let scale = pngSide / total                       // whole pixels per module keeps edges sharp
    let offset = (pngSide - scale * total) / 2        // any leftover pixels become extra white border
    let ctx = CGContext(data: nil, width: pngSide, height: pngSide, bitsPerComponent: 8, bytesPerRow: 0,
                        space: CGColorSpaceCreateDeviceRGB(),
                        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    ctx.setShouldAntialias(false)
    ctx.setFillColor(white)
    ctx.fill(CGRect(x: 0, y: 0, width: pngSide, height: pngSide))
    ctx.setFillColor(navy)
    // Core Graphics counts y from the bottom, so flip rows as we draw.
    func rect(col: Int, row: Int, width: Int, height: Int) -> CGRect {
        let x = offset + col * scale
        let yTop = offset + row * scale
        return CGRect(x: x, y: pngSide - yTop - height * scale, width: width * scale, height: height * scale)
    }
    for r in 0..<size { for c in 0..<size where modules[r][c] {
        ctx.fill(rect(col: c + quietZone, row: r + quietZone, width: 1, height: 1))
    } }
    if withIcon {
        guard let src = CGImageSourceCreateWithURL(iconURL as CFURL, nil),
              let iconCG = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fail("Can't read \(iconURL.path)") }
        ctx.setShouldAntialias(true)
        ctx.interpolationQuality = .high
        let box = rect(col: boxStart, row: boxStart, width: iconBoxModules, height: iconBoxModules)
        ctx.setFillColor(white)
        ctx.addPath(CGPath(roundedRect: box, cornerWidth: 1.2 * Double(scale), cornerHeight: 1.2 * Double(scale), transform: nil))
        ctx.fillPath()
        let pad = 0.6 * Double(scale)
        let w = box.width - 2 * pad
        let h = w * Double(iconCG.height) / Double(iconCG.width)
        ctx.draw(iconCG, in: CGRect(x: box.minX + pad, y: box.midY - h / 2, width: w, height: h))
    }
    return ctx.makeImage()!
}

func writePNG(_ image: CGImage, to url: URL) {
    guard let dest = CGImageDestinationCreateWithURL(url as CFURL, UTType.png.identifier as CFString, 1, nil) else {
        fail("Can't write \(url.path)")
    }
    CGImageDestinationAddImage(dest, image, nil)
    guard CGImageDestinationFinalize(dest) else { fail("Can't write \(url.path)") }
}

// MARK: 4. Write files

try? FileManager.default.createDirectory(at: outputDir, withIntermediateDirectories: true)
let outputs: [(name: String, icon: Bool)] = [("qr-links", false), ("qr-links-icon", true)]
for o in outputs {
    do {
        try makeSVG(withIcon: o.icon).write(to: outputDir.appendingPathComponent(o.name + ".svg"), atomically: true, encoding: .utf8)
    } catch { fail("Can't write \(o.name).svg: \(error)") }
    writePNG(makePNG(withIcon: o.icon), to: outputDir.appendingPathComponent(o.name + ".png"))
}

// MARK: 5. Prove it: decode each PNG with Apple's Vision framework

var allGood = true
print("QR version \(version) (\(size)×\(size) modules + \(quietZone)-module border), error correction H")
for o in outputs {
    let url = outputDir.appendingPathComponent(o.name + ".png")
    let request = VNDetectBarcodesRequest()
    request.symbologies = [.qr]
    try? VNImageRequestHandler(url: url, options: [:]).perform([request])
    let decoded = request.results?.compactMap { $0.payloadStringValue } ?? []
    let ok = decoded == [targetURL]
    allGood = allGood && ok
    print("\(ok ? "OK  " : "FAIL") \(o.name).png -> \(decoded.isEmpty ? "(nothing decoded)" : decoded.joined(separator: ", "))")
}
print("Saved in \(outputDir.path)")
exit(allGood ? 0 : 1)
