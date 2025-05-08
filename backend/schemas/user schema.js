var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['student', 'professor'],
        required: true
    },
    courses: [{
        type: Schema.ObjectId,
        ref: 'Course',
        required: true
    }],
    feedbacks: [{
        type: Schema.ObjectId,
        ref: 'Feedback'
    }],
    additionalInfo: {
        type: String,
    },
    major: {
        type: String,
    }
});

var users = mongoose.model('User', userSchema);

module.exports = users;