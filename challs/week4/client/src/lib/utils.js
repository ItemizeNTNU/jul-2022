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
/*
32:"0",
33:"1",
34:"2",
35:"3",
37:"4",
38:"5",
47:"6", # Hright
48:".", # Ground
49:"8",
50:"9", # Hleft
53:"a", # ShadowRight
54:"b", # ShadowLeft
62:"c",
63:"d", # Hbottom
64:"e",
65:"f",
66:"1", # Htop
67:"h",
68:"i", # Shadow
77:".", # Ground
78:"k",
79:"l",
80:"m",
81:"n",
82:"o",
83:"p",
92:"#"  # Crate
*/
export const parseMap = (data) => {
	const map = JSON.parse(data);
	const nmap = [];
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			let t = new Tile(x, y, TILE_SIZE, TILE_SIZE, "blue"); // ground
			if (map[y][x] === "#") t.setSprite(2, 6);
			else if (map[y][x] === "0") t.setSprite(2, 2);
			else if (map[y][x] === "1") t.setSprite(3, 2);
			else if (map[y][x] === "2") t.setSprite(4, 2);
			else if (map[y][x] === "3") t.setSprite(5, 2);
			else if (map[y][x] === "4") t.setSprite(7, 2);
			else if (map[y][x] === "5") t.setSprite(8, 2);
			else if (map[y][x] === "6") t.setSprite(2, 3);
			else if (map[y][x] === "8") t.setSprite(4, 3);
			else if (map[y][x] === "9") t.setSprite(5, 3);
			else if (map[y][x] === "a") t.setSprite(8, 3); // shadow
			else if (map[y][x] === "b") t.setSprite(9, 3); // shadow
			else if (map[y][x] === "c") t.setSprite(2, 4);
			else if (map[y][x] === "d") t.setSprite(3, 4);
			else if (map[y][x] === "e") t.setSprite(4, 4);
			else if (map[y][x] === "h") t.setSprite(7, 4); // grass
			else if (map[y][x] === "i") t.setSprite(8, 4); // shadow
			else if (map[y][x] === "k") t.setSprite(3, 5); // grass
			else if (map[y][x] === "l") t.setSprite(4, 5); // grass
			else if (map[y][x] === "m") t.setSprite(5, 5); // stone
			else if (map[y][x] === "n") t.setSprite(6, 5); // stone
			else if (map[y][x] === "o") t.setSprite(7, 5);
			else if (map[y][x] === "p") t.setSprite(8, 5);
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
