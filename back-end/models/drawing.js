const mongoose = require("mongoose");

const drawingSchema = new mongoose.Schema({
	squares: [
		{
			type: Boolean,
		},
	],
});

// Have toJSON method clean returned object
drawingSchema.set("toJSON", {
	transform: (doc, ret) => {
		ret.id = ret._id.toString();
		delete ret._id;
		delete ret.__v;
	},
});

module.exports = new mongoose.model("Drawing", drawingSchema);
