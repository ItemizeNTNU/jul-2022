export const MAP = `
..h.......6h.....8......h.............c4...........k...h8.....l.........l.......
.3ddddddd46.3dddde.3ddddddddddddddddd4b6....k.......l...8.3ddddddddddddddd4.kl.h
.9##i##ii6cdeiiiia.8iiiiiiiiiiiiiiiii6.cdddddddddddddddde.8##iiiiiiiiiiiii6.....
.9##...k.6bia3ddddde......k..........6.biiiiiiiiiiiiiiiia.8#..#.h......k..cdd4..
.9#.k....6.k.8iiiiia.................c4.k.......l.........8.hl.......l....bii6.l
.9......ocdddekl............l...pn..kb6.....3ddddddddddddde.#............h...6..
.9.....lmbiiia......k.....0112...m....cdddddeiiiiiiiiiiiiia..................6..
.9.p.l...#l........l011111h..8........biiiiia...l......h.....................6h.
.9m.n...#.k.........6......np8........................h.........l...h......h.6..
.9#.................cd4k...om8k......h.............................h.........6.k
.9##................bi6..m...8............l....0111111112....................6..
h.2.#.k...............cdddddde.................6011111128....................6..
..8........h.....k....biiiiiia.........l....011h6..pn..8f1111111112.....hh...6.l
..8...............k......l....k.............6011h#mkl.hf112...h...8..........c4.
..8h...............................k........66....#l...##.8..l....8..........b6.
.ff11112n...kk..pn................k......l..66..........#.8.3ddddde..l........6.
.o..n..8pn555555m....lk...........np........6cdddddd4.....8.8iiiiia....nl.....6.
m....p.85555555555555......mpn..npom.55555556biiiii#6..3dde.855555.....mo..h..6.
112##..85555..555555555555555on.p55555555555cddd4h##6..8iia.85555555555555pn..6.
..8##.n8pnk........55555555555555555555.....iiii6..hcdde.l..8h...55555555555556l
..8#..p8m................np55555555pn...........cdd4biia3ddde............555556.
.3e....8.................##no#....pm#...........bii6....8##ia.................6.
.8ap...8.kl......k...l......#m...m.##....h.......l.6....8#h..........h........6.
.8mh3dde.h......k........k#...........#............cddddel.#..................6.
de..8iia..................k.......##.........hl....biiiia................h....6k
ia..8......l.....................#............................l...............6.
.3dde................................l................................kk......6.
.9iia............l..........l.....................l.....k.....................6.
.9....k...........................l.......l....................h..............6.
.9.###..#.....l.....kl........l...............................................6.
.9..#..###.....k....#..........##..#k.###.###..#......#...#.#.....###.....##..6k
.9.k#...#..##..###....###.##..##...#.k.##..##.###.....###.#.#.#.#.#.#.###..##.6l
.9..#...#..##..###..#..#..##...#...#....#...#..#......#.#.###..#..#.#.#....#..6.
.9.###..##.###.#.#..#...#.###..##..##.###.###..##.###.#.#...#.#.#.###.#...##.h6.
.9....................##............k...................ll....................6.
.9..l.........kl............................................................h.6.
.f1111111111111111111111111111111111111111111111111111111111111111111111111111h.
h........h.......hl...............hl..........h.h..........h....................
`
	.slice(1, -1)
	.split("\n");

export const parsePlayer = (data, id) => {
	let verify = false,
		x = 0,
		y = 0;
	console.log(data);
	try {
		data = data.match(/.{1,8}/g);
		if (data[0] === id.substring(0, 8)) {
			x = parseInt(data[1], 16);
			y = parseInt(data[2], 16);
			if (x >= 0 && x < MAP[0].length - 1 && y >= 0 && y < MAP.length - 1)
				verify = true;
		}
	} catch (error) {
		return { verify, x: 0, y: 0 };
	}
	return { verify, x: x, y: y };
};

export const playerEncode = (player) => {
	return (
		"01" +
		player.id.substring(0, 8) +
		player.x.toString(16).padStart(8, "0") +
		player.y.toString(16).padStart(8, "0")
	);
};
export const playersEncode = (players) => {
	return (
		"02" +
		Object.values(players)
			.map((player) => playerEncode(player).substring(10))
			.join("")
	);
};

export const mapEncode = (player) => {
	const nmap = [];
	const n = 17; // Size of map to display
	// Clamp x and y direction
	const x =
		player.x >= MAP[0].length - n
			? Math.min(Math.floor(player.x - n / 3), MAP[0].length - n)
			: Math.max(Math.floor(player.x - n / 3), 0);
	const y =
		player.y >= MAP.length - n
			? Math.min(Math.floor(player.y - n / 3), MAP.length - n)
			: Math.max(Math.floor(player.y - n / 3), 0);
	console.log(x, y);
	for (let i = y; i < y + n; i++) {
		const tiles = [];
		for (let j = x; j < x + n; j++) {
			tiles.push(MAP[i][j]);
		}
		nmap.push(tiles.join(""));
	}
	return JSON.stringify(nmap);
};
