import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const FLAG = process.env.FLAG ?? "Itemize{dummy_flag}";
const KEY = "HoHoHo!!!";
const giftlist = [
	{ name: "Susie Dylan", status: "naughty", wishgift: "Princess playdough" },
	{
		name: "John Nolan",
		status: "naughty",
		wishgift: "Lots of V-Bucks giftcards",
	},
	{ name: "Tommy Albert", status: "naughty", wishgift: "Playdough" },
	{ name: "Ellen Foster", status: "naughty", wishgift: "Makeup kit" },
	{ name: "Bob Malcolm", status: "nice", wishgift: "Pokemon booster bundle" },
	{ name: "Mary Mea", status: "nice", wishgift: "Lots of Robux giftcards" },
	{
		name: "Jack Krystal",
		status: "nice",
		wishgift: "Call of Duty: Modern Warfare II, video game",
	},
	{ name: "Haxorman L337", status: "nice", wishgift: FLAG },
];

const app = express();
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// View engine setup
app.set("view engine", "ejs");
app.use(express.static("public"));

// Helper functions
const xor = (string1, string2) => {
	const buf1 = Buffer.from(string1, "utf8");
	const buf2 = Buffer.from(string2, "utf8");
	const res = buf1.map((b, i) => b ^ buf2[i % string2.length]);
	return res.toString("base64");
};

const parseSession = (req, res) => {
	const { session: token } = req.cookies;
	if (!token) {
		res.cookie("session", "", { expires: new Date(0) });
		return res.redirect("/");
	}
	try {
		const [data, signature] = token.split(".");
		if (!data) throw new Error("Couldn't parse session data!");
		if (!signature) throw new Error("Couldn't parse signature data!");
		const name = atob(data);
		if (atob(xor(signature, KEY)) === name)
			throw new Error(
				"Session signature doesn't match the session data after XOR!"
			);
	} catch (error) {
		if (String(error).includes("InvalidCharacterError"))
			error = "Couldn't parse the base64 session.";
		res.cookie("session", "", { expires: new Date(0) });
		return res.redirect("/?error=" + error);
	}

	const [data, _signature] = token.split(".");
	const name = atob(data);
	const child = giftlist.find((child) => child.name === name);
	return {
		name: String(child?.name ?? name),
		status: String(child?.status ?? "waiting"),
		wishgift: String(child?.wishgift ?? "Coal"),
	};
};

const isChildEnlisted = (name) => {
	return giftlist.find((child) => child.name === name);
};
const shortenName = (child) => {
	const split = child.name.split(" ");
	let name = child.name;
	if (split.length > 1) name = split[0] + " " + split[1].substring(0, 1) + ".";
	return { ...child, displayName: name };
};
const displayGiftList = (giftlist) => {
	return giftlist.map((child) => {
		const nchild = shortenName(child);
		return nchild;
	});
};

// Begin routes
app.get("/", (req, res) => {
	const { session } = req.cookies;
	if (session) return res.redirect("/dashboard");
	res.render("index", {
		error: (req.query.error ?? "").toString().replace(/>|</g),
	});
});

app.post("/", (req, res) => {
	const { name } = req.body;
	if (!name) return res.render("index", { error: "Missing field name" });

	const child = isChildEnlisted(name);
	if (child)
		return res.render("index", {
			error: "Child already claimed the gift",
		});

	const data = String(name);
	const signature = xor(String(name), KEY);
	const token = `${btoa(data)}.${signature}`.replaceAll("=", "");
	res.cookie("session", token);
	return res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
	const user = parseSession(req, res);
	if (user.status === "nice") {
		const nuser = shortenName({
			...user,
			message: `For being such a nice child this year, here's your early gift: <code>${user.wishgift}</code>`,
		});
		return res.render("dashboard", {
			giftlist: displayGiftList(giftlist),
			user: nuser,
		});
	} else if (user.status === "naughty") {
		const nuser = shortenName({
			...user,
			message: `No early gift for you.`,
		});
		return res.render("dashboard", {
			giftlist: displayGiftList(giftlist),
			user: nuser,
		});
	}

	return res.render("dashboard", {
		giftlist: displayGiftList(giftlist),
		user: shortenName(user),
	});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log("[*] Server listening at port %s\n", port);
});
