const Course = require('../schemas/course schema.js');

async function addCourse(courseID, sectionNumber, courseName, professor, assignments, lessons, students) {
    const course = new Course({
        courseID: courseID,
        sectionNumber: sectionNumber,
        courseName: courseName,
        professor: professor,
        assignments: assignments,
        lessons: lessons,
    });
    return await course.save();
}

async function getAllCourses() {
    require('../schemas/user schema.js');
    require('../schemas/lesson schema.js');
    require('../schemas/feedback schema.js');
    return await Course.find().populate('professor').populate('lessons').populate('students');
}

async function getCourseById(ID) {
    return await getAllCourses().then(courses => {
        return courses.find(course => course._id.toString() === ID.toString());
    });
}

async function updateCourseById(courseID, updatedCourse) {
    return await Course.findByIdAndUpdate(courseID, updatedCourse, { new: true });
}

async function deleteCourseById(courseID) {
    return await Course.findByIdAndDelete(courseID);
}

async function deleteAllCourses() {
    return await Course.deleteMany({});
}

module.exports = {
    addCourse,
    getCourseById,
    getAllCourses,
    updateCourseById,
    deleteCourseById,
    deleteAllCourses
};