var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    feedbacks: [{
        type: Schema.ObjectId,
        ref: 'Feedback'
    }],
    course: {
        type: Schema.ObjectId,
        ref: 'Course',
        required: true
    },
});

var lessons = mongoose.model('Lesson', lessonSchema);

module.exports = lessons;