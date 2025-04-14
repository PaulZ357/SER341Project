const Lesson = require('../schemas/lesson schema.js');

async function addLesson(feedbacks, course) {
    const lesson = new Lesson({
        feedbacks: feedbacks,
        course: course
    });
    return await lesson.save();
}

async function getAllLessons() {
    require("../schemas/feedback schema.js");
    require("../schemas/course schema.js");
    return await Lesson.find().populate('feedbacks').populate('course');
}

async function getLessonById(lessonID) {
    return await getAllLessons().then(lessons => {
        return lessons.find(lesson => lesson._id.toString() === lessonID.toString());
    });
}

async function updateLessonById(lessonID, updatedLesson) {
    return await Lesson.findByIdAndUpdate(lessonID, updatedLesson, { new: true });
}

async function deleteLessonById(lessonID) {
    return await Lesson.findByIdAndDelete(lessonID);
}

async function deleteAllLessons() {
    return await Lesson.deleteMany({});
}

module.exports = {
    addLesson,
    getLessonById,
    getAllLessons,
    updateLessonById,
    deleteLessonById,
    deleteAllLessons
};