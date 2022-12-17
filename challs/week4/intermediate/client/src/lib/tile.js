import { TILE_SIZE } from "./constants";

export default class Tile {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.loadSprite();
		this.sx = 2;
		this.sy = 5;
	}
	loadSprite() {
		if (!Tile.sprite) {
			Tile.sprite = new Image();
			Tile.sprite.onload = () => {
				console.log(Tile.sprite.src);
			};
			Tile.sprite.src = "/Tileset.png";
		}
	}
	draw(ctx) {
		if (Tile.sprite.complete) {
			ctx.beginPath();
			ctx.drawImage(
				Tile.sprite,
				this.sx * 8,
				this.sy * 8,
				8, // sprite width
				8, // sprite height
				this.x * TILE_SIZE,
				this.y * TILE_SIZE,
				this.width,
				this.height
			);
			ctx.closePath();
		}
		// ctx.beginPath();
		// ctx.strokeStyle = this.color;
		// ctx.rect(this.x * TILE_SIZE, this.y * TILE_SIZE, this.width, this.height);
		// ctx.stroke();
	}
	setSprite(sx, sy) {
		this.sx = sx;
		this.sy = sy;
	}
}
