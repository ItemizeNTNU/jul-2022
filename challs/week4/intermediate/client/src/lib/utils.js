import { TILE_SIZE } from "./constants";
import Player from "./player";
import Tile from "./tile";

export const parsePlayer = (data) => {
	let verify = false,
		x = 0,
		y = 0,
		id = "";
	try {
		data = data.substring(2).match(/.{1,8}/g);
		if (data[0].length === 8) {
			id = data[0];
			x = parseInt(data[1], 16);
			y = parseInt(data[2], 16);
			verify = true;
		}
	} catch (error) {
		console.error(error);
		return { verify, id: "", x: 0, y: 0 };
	}
	return { verify, id: id, x: x, y: y };
};

export const parseMap = (data) => {
	const map = JSON.parse(data);
	const nmap = [];
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			let t = new Tile(x, y, TILE_SIZE, TILE_SIZE, "blue"); // ground
			if (map[y][x] === "#")
				t = new Tile(x, y, TILE_SIZE, TILE_SIZE, "deeppink");
			if (map[y][x] === "a") t = new Tile(x, y, TILE_SIZE, TILE_SIZE, "orange");
			nmap.push(t);
		}
	}
	return nmap;
};

export const parsePlayers = (data) => {
	const players = [];
	try {
		data = data.substring(2).match(/.{1,16}/g);
		for (let d of data) {
			const x = parseInt(d.substring(0, 8), 16);
			const y = parseInt(d.substring(9), 16);
			players.push(new Player(x, y, TILE_SIZE, TILE_SIZE));
		}
	} catch (error) {}
	return players;
};

export const playerEncode = (id, x, y) => {
	return id + x.toString(16).padStart(8, "0") + y.toString(16).padStart(8, "0");
};
