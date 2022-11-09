import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const FLAG = process.env.FLAG ?? "itemize";

const app = express();
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Begin routes
app.get("/", (req, res) => {
	const { auth } = req.cookies;
	if (auth) return res.redirect("/dashboard");
	res.render("index", { error: undefined });
});

app.post("/", (req, res) => {
	console.log(req.body);
});

app.get("/dashboard", (req, res) => {
	const user = parseAuth(req, res);
	res.render("dashboard", { user, flag });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log("[*] Server listening at port %s\n", port);
});
