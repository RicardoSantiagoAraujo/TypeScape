export class Player {
  constructor(public x: number, public y: number) {}

  update(dt: number, input: any) {
    if (input.isDown("ArrowUp")) this.y -= 100 * dt;
    if (input.isDown("ArrowDown")) this.y += 100 * dt;
    if (input.isDown("ArrowLeft")) this.x -= 100 * dt;
    if (input.isDown("ArrowRight")) this.x += 100 * dt;
  }

  render() {
    const el = document.getElementById("player")!;
    el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
