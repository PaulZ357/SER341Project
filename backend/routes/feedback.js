const express = require("express");
const feedbackRouter = express.Router();
const Feedback = require("../schemas/feedback schema");
const mongoose = require("mongoose");

feedbackRouter
	.route("/")
	.get(async (req, res) => {
		try {
			const feedback = await Feedback.find({});
			res.json(feedback);
		} catch (e) {
			handleException(e, res);
		}
	})
	.post(async (req, res) => {
		try {
			const feedback = new Feedback(req.body);
			await feedback.save();
			const feedbackId = await feedback._id;
			res.send(`Feedback saved successfully with id ${feedbackId} `);
			console.log("Feedback saved successfully");
		} catch (e) {
			handleException(e, res);
		}
	})

	.delete(async (req, res) => {
		try {
			const respond = await Feedback.deleteMany({});
			res.json(respond);
		} catch (e) {
			console.log("Feedbacks deleted successfully");
		}
	});

feedbackRouter
	.route("/:feedbackId")
	.all(async (req, res, next) => {
		if (req.params.feedbackId.length !== 24) {
			res.status(404).send("Invalid feedback ID format");
		}
		else {
			if (await Feedback.findById(req.params.feedbackId)) {
				next();
			}
			else {
				res.status(404).send("Feedback not found");
			}
		}
	})
	.post((req, res) => {
		res.status(403).send("Method not allowed");
	})
	.get(async (req, res, next) => {
		try {
			const feedback = await Feedback.findById(req.params.feedbackId);
			res.json(feedback);
		} catch (e) {
			handleException(e, res);
		}
	})

	.put(async (req, res, next) => {
		try {
			const oldFeedback = await Feedback.findById(req.params.feedbackId);
			const feedback = await Feedback.findByIdAndUpdate(
				req.params.feedbackId,
				{ $set: req.body },
				{ new: true, runValidators: true }
			);
			res.json(feedback);
			console.log("Feedback updated");
		} catch (e) {
			handleException(e, res);
		}
	})
	.delete(async (req, res, next) => {
		try {
			const feedback = await Feedback.findByIdAndDelete(req.params.feedbackId);
			res.json(feedback);
			console.log("Feedback deleted");
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

module.exports = feedbackRouter;
