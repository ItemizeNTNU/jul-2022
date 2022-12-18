import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import Game from "./lib/game";
import { FPS } from "./lib/constants";

export function App() {
	const [socket, setSocket] = useState(null);
	const [game] = useState(new Game());
	const canvasRef = useRef(null);
	const [gameLoop, setGameLoop] = useState(0);

	const handleUserKeyPress = useCallback(
		(event) => {
			const { key } = event;
			let data;
			if (key === "ArrowLeft" || key === "a" || key === "h") {
				data = game.movePlayer(-1, 0);
			} else if (key === "ArrowUp" || key === "w" || key === "k") {
				data = game.movePlayer(0, -1);
			} else if (key === "ArrowRight" || key === "d" || key === "l") {
				data = game.movePlayer(1, 0);
			} else if (key === "ArrowDown" || key === "s" || key === "j") {
				data = game.movePlayer(0, 1);
			}
			if (data) {
				socket.send(data);
			}
		},
		[socket]
	);

	useEffect(() => {
		window.game = game;
		clearInterval(gameLoop);
		if (canvasRef.current && game) {
			game.init(canvasRef.current);
			game.draw();
			setGameLoop(setInterval(game.draw, FPS));
		}
	}, [game, canvasRef.current, gameLoop, setGameLoop]);

	useEffect(() => {
		window.addEventListener("keydown", handleUserKeyPress);
		return () => {
			window.removeEventListener("keydown", handleUserKeyPress);
		};
	}, [handleUserKeyPress]);

	useEffect(() => {
		const newSocket = new WebSocket(
			`ws://${
				import.meta.env.DEV ? "localhost" : import.meta.env.VITE_SERVERURL
			}:${import.meta.env.DEV ? "3000" : import.meta.env.VITE_SERVERPORT}`
		);
		setSocket(newSocket);
		return () => newSocket.close();
	}, []);

	useEffect(() => {
		if (!socket) return;
		socket.onopen = () => {
			socket.send("connect");
			socket.onmessage = (message) => {
				// console.log("Client received a message", message.data);
				game.update(message.data);
			};
			socket.onclose = (event) => {
				console.log("Client notified socket has closed", event);
			};
		};
	}, [socket]);

	return (
		<>
			<canvas ref={canvasRef} width={520} height={520}></canvas>
		</>
	);
}
