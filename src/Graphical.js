export default class Graphical {
  constructor(ctx) {
    this.width = 1;
    this.ctx = ctx;
    this.degY = 0;
    this.degX = 0;
    this.posX = 0;
    this.posY = 0;
    this.ctx.fillStyle = '#252020';
    this.ctx.translate(0, 0);
  }

  setColor(color) {
    this.ctx.fillStyle = color;
  }

  setPosition(posX, posY) {
    this.ctx.translate(-this.posX, -this.posY);
    this.posY = posY;
    this.posX = posX;
    this.ctx.translate(posX, posY);
  }

  setWidth(width) {
    this.width = width;
  }

  clear() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(-this.posX, -this.posY, 800, 600);
  }

  dot(x, y) {
    this.ctx.fillRect(x * this.width, y * this.width, this.width, this.width);
  }

  setRotateX(deg) {
    this.degX = (deg * Math.PI) / 180;
  }

  setRotateY(deg) {
    this.degY = (deg * Math.PI) / 180;
  }

  rotate(oldCoords) {
    let xsh =
      Math.cos(this.degY) * oldCoords.x + Math.sin(this.degY) * oldCoords.z;
    let zsh =
      -Math.sin(this.degY) * oldCoords.x + Math.cos(this.degY) * oldCoords.z;

    let ysh = Math.cos(this.degX) * oldCoords.y + Math.sin(this.degX) * zsh;
    zsh = -Math.sin(this.degX) * oldCoords.y + Math.cos(this.degX) * zsh;

    return { x: xsh, y: ysh, z: zsh };
  }

  fill(line1, line2, normal, color) {
    line1 = this.recompile(line1.from, line1.to);
    line2 = this.recompile(line2.from, line2.to);

    if (this.renderCheck(line1, line2, normal, color)) return;

    this.line(line1.from, line1.to, true, i =>
      this.line(line2.from, line2.to, true, null, i)
    );
  }

  renderCheck(edge1, edge2, normal, color) {
    const a = { x: edge1.to.x - edge1.from.x, y: edge1.to.y - edge1.from.y };
    const b = {
      x: edge2.from.x - edge1.from.x,
      y: edge2.from.y - edge1.from.y
    };
    const k = a.x * b.y - a.y * b.x;

    return normal * k >= 0;
  }

  line(point1, point2, fill = false, cb = null, stop = false) {
    let dx = point2.x - point1.x;
    let dy = point2.y - point1.y;

    let incX;
    if (dx > 0) incX = 1;
    if (dx === 0) incX = 0;
    if (dx < 0) incX = -1;

    let incY;
    if (dy > 0) incY = 1;
    if (dy === 0) incY = 0;
    if (dy < 0) incY = -1;

    dx = Math.abs(dx);
    dy = Math.abs(dy);

    let d;
    if (dx > dy) {
      d = dx;
    } else {
      d = dy;
    }

    let x = point1.x;
    let y = point1.y;

    let xerr = 0;
    let yerr = 0;
    for (let i = 0; i < d; i++) {
      xerr = xerr + dx;
      yerr = yerr + dy;
      if (xerr > d) {
        xerr = xerr - d;
        x = x + incX;
      }
      if (yerr > d) {
        yerr = yerr - d;
        y = y + incY;
      }

      if (fill && !cb && stop != i) continue;

      if (fill) {
        if (cb) this.line({ x, y }, cb(i));
        if (stop === i) return { x, y };
      } else this.dot(x, y);
    }
  }

  recompile(vertexStart, vertexEnd) {
    return {
      from: this.rotate(vertexStart),
      to: this.rotate(vertexEnd)
    };
  }
}
