const Feedback = require('../schemas/feedback schema.js');

async function addFeedback(course, student, description, rating) {
    const feedback = new Feedback({
        course: course,
        student: student,
        description: description,
        rating: rating
    });
    return await feedback.save();
}

async function getAllFeedback() {
    require('../schemas/course schema.js');
    require('../schemas/user schema.js');
    return await Feedback.find().populate('course').populate('student');
}

async function getFeedbackById(feedbackID) {
    return await getAllFeedback().then(feedbacks => {
        return feedbacks.find(feedback => feedback._id.toString() === feedbackID.toString());
    });
}

async function updateFeedbackById(feedbackID, updatedFeedback) {
    return await Feedback.findByIdAndUpdate(feedbackID, updatedFeedback, { new: true });
}

async function deleteFeedbackById(feedbackID) {
    return await Feedback.findByIdAndDelete(feedbackID);
}

async function deleteAllFeedback() {
    return await Feedback.deleteMany({});
}

module.exports = {
    addFeedback,
    getFeedbackById,
    getAllFeedback,
    updateFeedbackById,
    deleteFeedbackById,
    deleteAllFeedback
};