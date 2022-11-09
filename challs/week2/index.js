import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const FLAG = process.env.FLAG ?? "Itemize{dummy_flag}";
const KEY = "#¤&¤%eghjifghj3i4jt03jgr33ggggsdW#T##T%SDSGØÆØOPLUÅØHMGb"

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
const parseSession = (req, res) => {
	const { session: token } = req.cookies;
	try {
		jwt.verify(token, KEY)
	} catch (error) {
		res.cookie("session", "", { expires: new Date(0) });
		return res.redirect("/");
	}
	const session = jwt.decode(token)
    console.log(session)
	return { name: String(session?.name), status: String(session?.status) };
};

// Begin routes
app.get("/", (req, res) => {
	const { session } = req.cookies;
	if (session) return res.redirect("/dashboard");
	res.render("index", { error: undefined });
});

app.post("/", (req, res) => {
	const { name } = req.body;
    console.log(name)
	if (!name) return res.render("index", { error: "Missing field name" });
    const token = jwt.sign({ name: name, status: "waiting" }, KEY);
    res.cookie("session", token);
    res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
	const user = parseSession(req, res);
	res.render("dashboard", { user });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log("[*] Server listening at port %s\n", port);
});
