import { TILE_SIZE } from "./constants";
import Tile from "./tile";
import { parsePlayer } from "./utils";

export default class Player extends Tile {
	constructor(x, y, width, height) {
		super(x, y, width, height, "red");
		this.id = "";
		this.loadSprite();
		this.sx = 4;
		this.sy = 6;
	}
	loadSprite() {
		if (!Player.sprite) {
			Player.sprite = new Image();
			Player.sprite.onload = () => {
				console.log(Player.sprite.src);
			};
			Player.sprite.src = "/Tileset.png";
		}
	}
	update(data) {
		const { id, x, y } = parsePlayer(data);
		this.id = id;
		this.x = x;
		this.y = y;
	}
	draw(ctx, offset = { x: 0, y: 0 }) {
		ctx.shadowBlur = 5;
		ctx.shadowColor = "rgba(255,255,255,0.3)";
		if (Player.sprite.complete) {
			ctx.beginPath();
			ctx.drawImage(
				Player.sprite,
				this.sx * 8,
				this.sy * 8,
				8, // sprite width
				8, // sprite height
				(this.x + offset.x) * TILE_SIZE,
				(this.y + offset.y) * TILE_SIZE,
				this.width,
				this.height
			);
			ctx.closePath();
		}
		ctx.shadowBlur = 0;
	}
}
