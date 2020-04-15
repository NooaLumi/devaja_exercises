const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");

// Allow cross-origin requests during production
if (process.env.NODE_ENV !== "production") {
	app.use(cors());
}

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("build"));

// Allow react to handle rest of the routes
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Log errors
app.use((err, req, res, next) => {
	console.error(err.message);
	next(err);
});

module.exports = app;
