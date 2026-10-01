// Docs background for Project Dream images: flat Pulze orange, a soft near-black blotch rising
// from the bottom edge, a faint shade at the top, per-pixel grain. No grid (that's the marketing header).
// Same look as the RenderFlow docs shots, in orange. Coordinates are fractions of the canvas.
window.paintDocsBg = function (cv) {
  const W = cv.width, H = cv.height, cx = cv.getContext('2d')
  cx.fillStyle = 'rgb(242,130,54)'; cx.fillRect(0, 0, W, H)
  // [x, y, radiusX, radiusY, alpha] as fractions of W/H
  const blobs = [[0.33, 1.02, 0.30, 0.22, 0.85], [0.45, 1.05, 0.22, 0.12, 0.5], [0.5, -0.05, 0.28, 0.1, 0.18], [0.05, 0.6, 0.12, 0.3, 0.12]]
  for (const [x, y, rx, ry, a] of blobs) {
    cx.save(); cx.translate(x * W, y * H); cx.scale(rx * W, ry * H)
    const g = cx.createRadialGradient(0, 0, 0, 0, 0, 1)
    for (let r = 0; r <= 1.0001; r += 0.05) g.addColorStop(Math.min(r, 1), `rgba(32,31,31,${a * Math.exp(-((2.6 * r) ** 2) / 2)})`)
    cx.fillStyle = g; cx.fillRect(-1, -1, 2, 2); cx.restore()
  }
  const img = cx.getImageData(0, 0, W, H), p = img.data
  for (let i = 0; i < p.length; i += 4) {
    const n = (Math.random() + Math.random() + Math.random() - 1.5) * 2
    p[i] += n * (0.033 * p[i] + 0.9); p[i + 1] += n * (0.033 * p[i + 1] + 0.9); p[i + 2] += n * (0.033 * p[i + 2] + 0.9)
  }
  cx.putImageData(img, 0, 0)
}
