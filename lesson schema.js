var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lessonSchema = new Schema({
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

var lessons = mongoose.model('lesson', lessonSchema);

module.exports = lessons;