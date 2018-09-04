if (typeof CanvasRenderingContext2D !== 'undefined') {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    const min_size = Math.min(w, h)
    if (r > min_size / 2) r = min_size / 2
    // 开始绘制
    this.beginPath()
    this.moveTo(x + r, y)
    this.arcTo(x + w, y, x + w, y + h, r)
    this.arcTo(x + w, y + h, x, y + h, r)
    this.arcTo(x, y + h, x, y, r)
    this.arcTo(x, y, x + w, y, r)
    this.closePath()
    return this
  }
}

const draw = function(cxt, img, x, y, round) {
  cxt.roundRect(x, y, img.width, img.height, round || 0)
  cxt.fillStyle = cxt.createPattern(img, 'no-repeat')

  // 图片纹理是从左上角即(0, 0)位置开始填充，所以需要先位移到矩形框的位置，再填充
  cxt.translate(x, y)
  cxt.fill()
  cxt.translate(-x, -y)
}

export { draw }
