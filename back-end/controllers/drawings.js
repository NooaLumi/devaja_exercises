const drawingsRouter = require("express").Router();
const Drawing = require("../models/drawing");

// Get all
drawingsRouter.get("/", async (req, res, next) => {
	try {
		const drawings = await Drawing.find({});
		res.json(drawings.map((i) => i.toJSON()));
	} catch (err) {
		next(err);
	}
});

// Get by id
drawingsRouter.get("/:id", async (req, res, next) => {
	try {
		const drawing = await Drawing.findOne({ _id: req.params.id });
		res.json(drawing.toJSON());
	} catch (err) {
		next(err);
	}
});

// Create new
drawingsRouter.post("/", async (req, res, next) => {
	try {
		const result = await new Drawing({
			squares: req.body.squares,
		}).save();

		res.status(201).send(result);
	} catch (err) {
		next(err);
	}
});

module.exports = drawingsRouter;
