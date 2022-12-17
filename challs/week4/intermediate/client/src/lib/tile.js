import { TILE_SIZE } from "./constants";

export default class Tile {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.rect(this.x * TILE_SIZE, this.y * TILE_SIZE, this.width, this.height);
		ctx.fill();
	}
}
