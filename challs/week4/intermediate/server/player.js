import { parsePlayer } from "./utils.js";

export default class Player {
	constructor(id, x, y) {
		this.id = id;
		this.x = x;
		this.y = y;
	}
	update(data) {
		const { verify, x, y } = parsePlayer(data, this.id);
		if (!verify) return;
		this.x = x;
		this.y = y;
	}
}
