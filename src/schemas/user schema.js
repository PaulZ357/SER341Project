var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var users = mongoose.model('User', userSchema);

module.exports = users;