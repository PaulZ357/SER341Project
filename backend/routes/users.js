const express = require("express");
const userRouter = express.Router();
const User = require("../schemas/user schema");
const mongoose = require("mongoose");
const mongo = require("mongodb");

userRouter
	.route("/")
	.get(async (req, res) => {
		try {
			const user = await User.find({});
			res.json(user);
		} catch (e) {
			handleException(e, res);
		}
	})
	.post(async (req, res) => {
		try {
			const user = new User(req.body);
			await user.save();
			const userId = await user._id;
			res.send(`User saved successfully with id ${userId} `);
			console.log("User saved successfully");
		} catch (e) {
			handleException(e, res);
		}
	})

	.delete(async (req, res) => {
		try {
			const respond = await User.deleteMany({});
			res.json(respond);
		} catch (e) {
			handleException(e, res);
		}
	});

userRouter
	.route("/:userId")
	.all(async (req, res, next) => {
		if (req.params.userId.length !== 24) {
			res.status(404).send("Invalid user ID format");
		}
		else {
			if (await User.findById(req.params.userId)) {
				next();
			}
			else {
				res.status(404).send("User not found");
			}
		}
	})
	.post((req, res) => {
		res.status(403).send("Method not allowed");
	})
	.get(async (req, res, next) => {
		try {
			const user = await User.findById(req.params.userId);
			res.json(user);
		} catch (e) {
			handleException(e, res);
		}
	})

	.put(async (req, res, next) => {
		try {
			const oldUser = await User.findById(req.params.userId);
			const user = await User.findByIdAndUpdate(
				req.params.userId,
				{ $set: req.body },
				{ new: true, runValidators: true }
			);
			res.json(user);
			console.log("User updated");
		} catch (e) {
			handleException(e, res);
		}
	})
	.delete(async (req, res, next) => {
		try {
			const user = await User.findByIdAndDelete(req.params.userId);
			res.json(user);
			console.log("User deleted");
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

module.exports = userRouter;
