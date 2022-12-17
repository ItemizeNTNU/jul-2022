import { TILE_SIZE } from "./constants";
import Player from "./player";
import { parseMap, parsePlayers, playerEncode } from "./utils";

export default class Game {
	constructor() {
		this.canvas = undefined;
		this.ctx = undefined;
		this.width = 520;
		this.height = 520;

		this.player = new Player(1, 1, TILE_SIZE, TILE_SIZE);
		this.players = [];
		this.map = [];
	}
	init(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.width = canvas.width;
		this.height = canvas.height;
	}
	movePlayer(x, y) {
		return playerEncode(this.player.id, this.player.x + x, this.player.y + y);
	}
	update(data) {
		const type = data.substring(0, 2);
		if (type === '["') {
			this.map = parseMap(data); // Parse map
		} else if (type === "01") {
			this.player.update(data); // Parse current player
		} else if (type === "02") {
			this.players = parsePlayers(data); // Parse all players position
		}
	}
	draw() {
		if (!this.ctx) return;
		this.ctx.clearRect(0, 0, this.width, this.height);
		for (let i = this.map.length - 1; i >= 0; i--) {
			const tile = this.map[i];
			tile.draw(this.ctx);
		}
		const offset = {
			x: Math.max(-Math.max(Math.floor(this.player.x - 17 / 3), 0), -(80 - 17)),
			y: Math.max(-Math.max(Math.floor(this.player.y - 17 / 3), 0), -(38 - 17)),
		};
		for (let i = this.players.length - 1; i >= 0; i--) {
			const player = this.players[i];
			// Skip drawing the current player
			if (player.x === this.player.x && player.y === this.player.y) continue;
			player.draw(this.ctx, offset);
		}
		this.player.draw(this.ctx, offset);
	}
}
