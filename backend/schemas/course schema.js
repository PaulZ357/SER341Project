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

var course = mongoose.model('Course', courseSchema);

module.exports = course