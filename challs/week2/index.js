import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const FLAG = process.env.FLAG ?? "Itemize{dummy_flag}";

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
const parseAuth = (req, res) => {
	const { auth: authCookie } = req.cookies;
	try {
		JSON.parse(atob(authCookie));
	} catch (error) {
		res.cookie("auth", "", { expires: new Date(0) });
		return res.redirect("/");
	}
	const auth = JSON.parse(atob(authCookie));
	return { admin: Boolean(auth?.admin), username: String(auth?.user) };
};

// Begin routes
app.get("/", (req, res) => {
	const { session } = req.cookies;
	if (session) return res.redirect("/dashboard");
	res.render("index", { error: undefined });
});

app.post("/", (req, res) => {
	const { name } = req.body;
	if (!name) return res.render("index", { error: "Missing field name" });
    res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
	const user = parseAuth(req, res);
	res.render("dashboard", { user, flag });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log("[*] Server listening at port %s\n", port);
});
