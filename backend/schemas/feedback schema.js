var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
    lesson: {
        type: Schema.ObjectId,
        ref: 'Lesson',
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

var feedbacks = mongoose.model('Feedback', feedbackSchema);

module.exports = feedbacks;