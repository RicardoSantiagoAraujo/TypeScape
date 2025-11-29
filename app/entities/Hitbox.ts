export class Hitbox {
  x: number;  // X position
  y: number;  // Y position
  width: number;  // Width of the hitbox
  height: number;  // Height of the hitbox

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Method to check if two hitboxes are colliding
  isCollidingWith(other: Hitbox): boolean {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}
