var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var courseSchema = new Schema({
    courseID: {
        type: String,
        required: true,
        unique: true
    },
    sectionNumber: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    professor: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    assignments: [{
        type: Number,
        required: true
    }],
    lessons: [{
        type: Schema.ObjectId,
        ref: 'Lesson',
        required: true
    }],
    students: [{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }],

});

var lessonSchema = new Schema({
    feedbacks   : [{
        type: Schema.ObjectId,
        ref: 'Feedback'
    }],
    course: {
        type: Schema.ObjectId,
        ref: 'Course',
        required: true
    },
});

var feedbackSchema = new Schema({
    course: {
        type: Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    student: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

var userSchema = new Schema({
    name: {
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
    }]
});

var comments = mongoose.model('comment', commentSchema);
var lessons = mongoose.model('lesson', commentSchema);
var feedbacks = mongoose.model('feedback', commentSchema);
var users = mongoose.model('user', commentSchema);

module.exports = [comments, lessons, feedbacks, users];