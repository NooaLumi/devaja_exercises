const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");

const drawingsRouter = require("./controllers/drawings");

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB", err.message);
	});

// Allow cross-origin requests during production
if (process.env.NODE_ENV !== "production") {
	app.use(cors());
}

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("build"));

// Api routes
app.use("/api/drawings", drawingsRouter);

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
