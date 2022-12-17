import { TILE_SIZE } from "./constants";
import Tile from "./tile";
import { parsePlayer } from "./utils";

export default class Player extends Tile {
	constructor(x, y, width, height) {
		super(x, y, width, height, "red");
		this.id = "";
	}
	update(data) {
		const { id, x, y } = parsePlayer(data);
		this.id = id;
		this.x = x;
		this.y = y;
	}
	draw(ctx, offset = { x: 0, y: 0 }) {
		console.log(offset);
		ctx.beginPath();
		ctx.fillStyle = "red";
		ctx.rect(
			(this.x + offset.x) * TILE_SIZE,
			(this.y + offset.y) * TILE_SIZE,
			this.width,
			this.height
		);
		ctx.fill();
	}
}
