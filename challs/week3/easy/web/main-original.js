const move = (e) => {
	e.style.top = `${
		Math.random() * (window.innerHeight - e.offsetHeight + 5)
	}px`;
	e.style.left = `${Math.random() * (window.innerWidth - e.offsetWidth + 5)}px`;
};
(() => {
	const btn = document.getElementById("btn");
	btn.addEventListener("mouseover", function () {
		move(this);
	});
	btn.addEventListener("click", function () {
		move(this);
		if (false) window.open("/h0h0h0.html");
	});
	window.addEventListener("resize", () => {
		move(btn);
	});
})();
