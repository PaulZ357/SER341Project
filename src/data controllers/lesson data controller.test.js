require("../dependency fix.js");
const mongoose = require('mongoose');
const config = require("../../config/default.json");
const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.${config.DB_URL}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const LessonDataController = require("./lesson data controller.js");
const CourseDataController = require("./course data controller.js");
const UserDataController = require("./user data controller.js");

let course

beforeAll(async () => {
    await mongoose.connect(uri);
    let professor = await UserDataController.addUser("John Doe", "johndoe", "password123", "professor", [], []);
    course = await CourseDataController.addCourse("SER515", "1", "Software Engineering", professor._id, [], [], []);
    await LessonDataController.deleteAllLessons();
});

afterEach(async () => {
    await LessonDataController.deleteAllLessons();
    await CourseDataController.deleteAllCourses();
});

afterAll(async () => {
    await UserDataController.deleteAllUsers();
    await mongoose.connection.close();
});

describe('Course Data Controller Test', () => {
    it('should add a lesson successfully', async () => {
        let lesson = await LessonDataController.addLesson([], course._id);
        expect(lesson.course._id.toString()).toBe(course._id.toString());
    });
    it('should get all lesson successfully', async () => {
        let lesson1 = await LessonDataController.addLesson([], course._id);
        let course2 = await CourseDataController.addCourse("SER516", "2", "Software Testing", course.professor._id, [], [], []);
        let lesson2 = await LessonDataController.addLesson([], course2._id);
        let lessons = await LessonDataController.getAllLessons();
        expect(lessons.length).toBe(2);
        expect(lessons[0]._id.toString()).toBe(lesson1._id.toString());
        expect(lessons[1]._id.toString()).toBe(lesson2._id.toString());
    });
    it('should get a lesson by ID successfully', async () => {
        let lesson = await LessonDataController.addLesson([], course._id);
        let foundLesson = await LessonDataController.getLessonById(lesson._id.toString());
        expect(foundLesson._id.toString()).toBe(lesson._id.toString());
    });
    it('should update a lesson by ID successfully', async () => {
        let lesson = await LessonDataController.addLesson([], course._id);
        let course2 = await CourseDataController.addCourse("SER516", "2", "Software Testing", course.professor._id, [], [], []);
        let updatedLesson = await LessonDataController.updateLessonById(lesson._id.toString(), { course: course2._id });
        expect(updatedLesson.course._id.toString()).toBe(course2._id.toString());
        expect(updatedLesson._id.toString()).toBe(lesson._id.toString());
    });
    it('should delete a lesson by ID successfully', async () => {
        let lessonToDelete = await LessonDataController.addLesson([], course._id);
        let lessonToKeep = await LessonDataController.addLesson([], course._id);
        await LessonDataController.deleteLessonById(lessonToDelete._id.toString());
        let lessons = await LessonDataController.getAllLessons();
        expect(lessons.length).toBe(1);
        expect(lessons[0]._id.toString()).toBe(lessonToKeep._id.toString());
    });
    it('should delete all lessons successfully', async () => {
        await LessonDataController.addLesson([], course._id);
        let course2 = await CourseDataController.addCourse("SER516", "2", "Software Testing", course.professor._id, [], [], []);
        await LessonDataController.addLesson([], course2._id);
        await LessonDataController.deleteAllLessons();
        let lessons = await LessonDataController.getAllLessons();
        expect(lessons.length).toBe(0);
    });
});