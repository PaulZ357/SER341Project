const express = require("express");
const lessonRouter = express.Router();
const Lesson = require("../schemas/lesson schema");
const mongoose = require("mongoose");

lessonRouter
	.route("/")
	.get(async (req, res) => {
		try {
			const lesson = await Lesson.find({});
			res.json(lesson);
		} catch (e) {
			handleException(e, res);
		}
	})
	.post(async (req, res) => {
		try {
			const lesson = new Lesson(req.body);
			await lesson.save();
			res.json(lesson);
			console.log("Lesson saved successfully");
		} catch (e) {
			handleException(e, res);
		}
	})

	.delete(async (req, res) => {
		try {
			const respond = await Lesson.deleteMany({});
			res.json(respond);
		} catch (e) {
			handleException(e, res);
		}
	});

lessonRouter
	.route("/:lessonId")
	.all(async (req, res, next) => {
		if (req.params.lessonId.length !== 24) {
			res.status(404).send("Invalid lesson ID format");
		}
		else {
			if (await Lesson.findById(req.params.lessonId)) {
				next();
			}
			else {
				res.status(404).send("Lesson not found");
			}
		}
	})
	.post((req, res) => {
		res.status(403).send("Method not allowed");
	})
	.get(async (req, res, next) => {
		try {
			const lesson = await Lesson.findById(req.params.lessonId);
			res.json(lesson);
		} catch (e) {
			handleException(e, res);
		}
	})

	.put(async (req, res, next) => {
		try {
			const oldLesson = await Lesson.findById(req.params.lessonId);
			const lesson = await Lesson.findByIdAndUpdate(
				req.params.lessonId,
				{ $set: req.body },
				{ new: true, runValidators: true }
			);
			res.json(lesson);
			console.log("Lesson updated");
		} catch (e) {
			handleException(e, res);
		}
	})
	.delete(async (req, res, next) => {
		try {
			const lesson = await Lesson.findByIdAndDelete(req.params.lessonId);
			res.json(lesson);
			console.log("Lesson deleted");
		} catch (e) {
			handleException(e, res);
		}
	});


	function handleException(e, res) {
		if (e instanceof mongoose.Error.ValidationError) {
			res.status(400);
			const error_message = `Failed to save data in db. Missing/invalid IDs: ${Object.keys(e.errors).join(", ")}`;
			console.log(error_message);
			res.send(error_message);
		}
		else if ((e instanceof mongo.MongoServerError) && e.code === 11000) {
			res.status(400);
			const error_message = `Failed to save data in db. "${Object.keys(e.keyPattern).join(", ")}" field is duplicated`;
			console.log(error_message);
			res.send(error_message);
		}
		else {
			res.status(500);
			const error_message = `Failed to save data in db. Error: ${e.message}`;
			res.send(error_message);
			console.log(error_message);
		}
	}

module.exports = lessonRouter;
