class Graphical {
  constructor(ctx) {
    this.width = 1;
    this.ctx = ctx;
    this.degY = 0;
    this.degX = 0;
    this.ctx.fillStyle = '#252020';
    this.ctx.translate(250, 250);
  }

  setColor(color) {
    this.ctx.fillStyle = color;
  }

  setWidth(width) {
    this.width = width;
  }

  clear() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 800, 600);
  }

  dot(x, y) {
    this.ctx.fillRect(x * this.width, y * this.width, this.width, this.width);
  }

  //Алгоритм Брезенхэма
  circle(c, radius) {
    let x = 0,
      y = radius,
      gap = 0,
      delta = 2 - 2 * radius;

    while (y >= 0) {
      this.dot(c.a + x, c.b + y);
      this.dot(c.a + x, c.b - y);
      this.dot(c.a - x, c.b - y);
      this.dot(c.a - x, c.b + y);
      gap = 2 * (delta + y) - 1;
      if (delta < 0 && gap <= 0) {
        x++;
        delta += 2 * x + 1;
        continue;
      }
      if (delta > 0 && gap > 0) {
        y--;
        delta -= 2 * y + 1;
        continue;
      }
      x++;
      delta += 2 * (x - y);
      y--;
    }
  }

  square(point, w, h) {
    this.line(point, { x: point.x + w, y: point.y });
    this.line(
      { x: point.x + w, y: point.y },
      { x: point.x + w, y: point.y + h }
    );
    this.line(point, { x: point.x, y: point.y + h });
    this.line(
      { x: point.x, y: point.y + h },
      { x: point.x + w, y: point.y + h }
    );
  }

  setShift(shift) {
    this.shift = shift;
  }

  setRotateX(deg) {
    this.degX = (deg * Math.PI) / 180;
  }

  setRotateY(deg) {
    this.degY = (deg * Math.PI) / 180;
  }

  polygon(vertex) {
    let startV = vertex.shift();
    let last = startV;

    while (vertex.length > 0) {
      this.line3d(last, vertex[0]);
      last = vertex.shift();
    }
    this.line3d(last, startV);
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

  /*
  line(point1, point2) {
    if (point2.x < point1.x || point2.y < point1.y) {
      const pointTemp = { x: point1.x, y: point1.y };
      point1 = { x: point2.x, y: point2.y };
      point2 = { x: pointTemp.x, y: pointTemp.y };
    }

    if (point2.x != point1.x) {
      const d = (point2.y - point1.y) / (point2.x - point1.x);
      this.lineCompile({ a: point1.x, b: point2.x }, point1.y, d, false);
    } else {
      const d = (point2.x - point1.x) / (point2.y - point1.y);
      this.lineCompile({ a: point1.y, b: point2.y }, point1.x, d, true);
    }
  }
  lineCompile(n, m, d, fl) {
    d *= 0.3;
    for (let i = n.a; i <= n.b; i += 0.3) {
      if (fl) this.dot(m, i);
      else this.dot(i, m);
      m += d;
    }
  }*/

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
    console.log(color, normal * k >= 0);
    
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

  line3d(vertexStart, vertexEnd) {
    this.line(
      this.rotate(vertexStart),
      this.rotate(vertexEnd)
    );
  }

  showCoordsLine() {
    let saveColor = this.ctx.fillStyle;
    this.ctx.fillStyle = 'red';
    this.line3d(
      { x: 10 - this.shift.x, y: 10 - this.shift.y, z: 10 - this.shift.z },
      { x: 30 - this.shift.x, y: 10 - this.shift.y, z: 10 - this.shift.z }
    );
    this.ctx.fillStyle = 'green';
    this.line3d(
      { x: 10 - this.shift.x, y: 10 - this.shift.y, z: 10 - this.shift.z },
      { x: 10 - this.shift.x, y: 30 - this.shift.y, z: 10 - this.shift.z }
    );
    this.ctx.fillStyle = 'blue';
    this.line3d(
      { x: 10 - this.shift.x, y: 10 - this.shift.y, z: 10 - this.shift.z },
      { x: 10 - this.shift.x, y: 10 - this.shift.y, z: 30 - this.shift.z }
    );
    this.ctx.fillStyle = saveColor;
  }
}