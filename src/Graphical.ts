interface Point {
  x:number,
  y:number,
  z:number
};

interface Line {
  from: Point,
  to:Point
}

export default class Graphical {
  private degX:number = 0; 
  private degY:number = 0; 
  private posX:number = 0; 
  private posY:number = 0; 
  private ctx:any; 
  public light:Point = {x: 300, y: 300, z:  450};
  public K:number = 0.8;
  public I:number = 255;

  constructor(ctx) {
    this.ctx = ctx;
    this.ctx.fillStyle = '#252020';
    this.ctx.translate(0, 0);
  }

  showLight(){
    let recomp = this.rotate(this.light);
    let save = this.ctx.fillStyle;
    this.ctx.fillStyle = `yellow`;
    this.ctx.fillRect(recomp.x , recomp.y, 10, 10);
    this.ctx.fillStyle = save;
  }

  setColor(color:string):void {
    this.ctx.fillStyle = color;
  }

  setPosition(posX:number, posY:number):void {
    this.ctx.translate(-this.posX, -this.posY);
    this.posY = posY;
    this.posX = posX;
    this.ctx.translate(posX, posY);
  }

  clear():void {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(-this.posX, -this.posY, 800, 600);
  }

  dot(x:number, y:number) {
    this.ctx.fillRect(x , y, 1, 1);
  }

  dotColor(x:number, y:number, color:number) {
    let save = this.ctx.fillStyle;
    this.ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
    this.ctx.fillRect(x , y, 10, 10);
    this.ctx.fillStyle = save;
  }

  setRotateX(deg:number):void {
    this.degX = (deg * Math.PI) / 180;
  }

  setRotateY(deg:number):void {
    this.degY = (deg * Math.PI) / 180;
  }

  rotate(point:Point):Point {
    let xsh =
      Math.cos(this.degY) * point.x + Math.sin(this.degY) * point.z;
    let zsh =
      -Math.sin(this.degY) * point.x + Math.cos(this.degY) * point.z;
    let ysh = Math.cos(this.degX) * point.y + Math.sin(this.degX) * zsh;
    zsh = -Math.sin(this.degX) * point.y + Math.cos(this.degX) * zsh;

    return { x: xsh, y: ysh, z: zsh };
  }

  fill(line1:Line, line2:Line, normal:number, intensive):void {
    line1 = this.recompile(line1.from, line1.to);
    line2 = this.recompile(line2.from, line2.to);

    
    if (this.renderCheck(line1, line2, normal)) return;

    this.line(line1.from, line1.to, [intensive[0], intensive[1], intensive[3], intensive[2]], true, (i, fromIntens, toIntensive) =>
      this.line(line2.from, line2.to, [fromIntens, toIntensive], true, null, i)
    );

    
    this.dotColor(line1.from.x, line1.from.y, Math.ceil(intensive[0]));
    this.dotColor(line1.to.x, line1.to.y, Math.ceil(intensive[1]));
    this.dotColor(line2.from.x, line2.from.y, Math.ceil(intensive[3]));
    this.dotColor(line2.to.x, line2.to.y, Math.ceil(intensive[2]));

  }

  renderCheck(edge1:Line, edge2:Line, normal:number):boolean {
    const a:Point = { x: edge1.to.x - edge1.from.x, y: edge1.to.y - edge1.from.y, z: 0 };
    const b:Point = {
      x: edge2.from.x - edge1.from.x,
      y: edge2.from.y - edge1.from.y,
      z:0
    };
    const k = a.x * b.y - a.y * b.x;

    return normal * k >= 0;
  }

  line(point1:Point, point2:Point, intensive, fill:boolean = false, cb = null, stop:number = -1) {
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
        if (cb) this.line({ x, y, z:0 }, cb(i));
        if (stop === i) return { x, y };
      } else this.dot(x, y);
    }
  }

  recompile(vertexStart:Point, vertexEnd:Point):Line {
    return {
      from: this.rotate(vertexStart),
      to: this.rotate(vertexEnd)
    };
  }
}
