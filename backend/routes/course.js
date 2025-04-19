const express = require("express");
const courseRouter = express.Router();
const Course = require("../schemas/course schema");
const mongoose = require("mongoose");

courseRouter
	.route("/")
	.get(async (req, res) => {
		try {
			const course = await Course.find({});
			res.json(course);
		} catch (e) {
			handleException(e, res);
		}
	})
	.post(async (req, res) => {
		try {
			const course = new Course(req.body);
			await course.save();
			const courseId = await course._id;
			res.send(`Course saved successfully with id ${courseId} `);
			console.log("Course saved successfully");
		} catch (e) {
			handleException(e, res);
		}
	})

	.delete(async (req, res) => {
		try {
			const respond = await Course.deleteMany({});
			res.json(respond);
		} catch (e) {
			console.log("Courses deleted successfully");
		}
	});

courseRouter
	.route("/:courseId")
	.all(async (req, res, next) => {
		if (req.params.courseId.length !== 24) {
			res.status(404).send("Invalid course ID format");
		}
		else {
			if (await Course.findById(req.params.courseId)) {
				next();
			}
			else {
				res.status(404).send("Course not found");
			}
		}
	})
	.post((req, res) => {
		res.status(403).send("Method not allowed");
	})
	.get(async (req, res, next) => {
		try {
			const course = await Course.findById(req.params.courseId);
			res.json(course);
		} catch (e) {
			handleException(e, res);
		}
	})

	.put(async (req, res, next) => {
		try {
			const oldCourse = await Course.findById(req.params.courseId);
			const course = await Course.findByIdAndUpdate(
				req.params.courseId,
				{ $set: req.body },
				{ new: true, runValidators: true }
			);
			res.json(course);
			console.log("Course updated");
		} catch (e) {
			handleException(e, res);
		}
	})
	.delete(async (req, res, next) => {
		try {
			const course = await Course.findByIdAndDelete(req.params.courseId);
			res.json(course);
			console.log("Course deleted");
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

module.exports = courseRouter;
