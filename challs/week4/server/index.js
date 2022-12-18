import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import Player from "./player.js";
import { playerEncode, mapEncode, playersEncode } from "./utils.js";

const PORT = process.env.PORT || 3000;
const fps = 10;
const FPS = 1000 / fps;
const clients = {};

// Websocket routes
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", function (ws, req) {
	const id = uuidv4();
	ws.id = id;
	console.log(`Client ${id} connected`);
	clients[id] = new Player(id, 5, 5);

	ws.on("message", (data) => {
		if (clients[ws.id]) {
			clients[ws.id].update("" + data);
			clients[ws.id].lastTimeout = new Date();
		}
	});

	ws.on("close", () => {
		console.log("closing", ws.id);
		delete clients[ws.id];
	});
});

const timeoutClients = () => {
	for (let i = Object.values(clients).length - 1; i >= 0; i--) {
		const client = Object.values(clients)[i];
		// Timeout after 5 minute without movement
		if ((new Date() - client.lastTimeout) / 1000 >= 60 * 5) {
			console.log("KILLING", client.id);
			try {
				delete clients[client.id];
				wss.clients.forEach((c) => {
					if (c.id === client.id) wss.clients.delete(clients);
				});
			} catch (error) {}
		}
	}
};

const game = () => {
	wss.clients.forEach((client) => {
		if (clients[client.id]) {
			client.send(playerEncode(clients[client.id]));
			client.send(playersEncode(clients));
			client.send(mapEncode(clients[client.id]));
		}
	});
	timeoutClients();
};

setInterval(game, FPS);
wss.on("listening", () => {
	console.log("[*] Server listening at port %s\n", PORT);
});
