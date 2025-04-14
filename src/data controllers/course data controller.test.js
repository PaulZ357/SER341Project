require("../dependency fix.js");
const mongoose = require('mongoose');
const config = require("../../config/default.json");
const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.${config.DB_URL}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const CourseDataController = require("./course data controller.js");
const UserDataController = require("./user data controller.js");

let professor

beforeAll(async () => {
    await mongoose.connect(uri);
    professor = await UserDataController.addUser("John Doe", "johndoe", "password123", "professor", [], []);
    await CourseDataController.deleteAllCourses();
});

afterEach(async () => {
    await CourseDataController.deleteAllCourses();
});

afterAll(async () => {
    await UserDataController.deleteAllUsers();
    await mongoose.connection.close();
});

describe('Course Data Controller Test', () => {
    it('should add a course successfully', async () => {
        let course = await CourseDataController.addCourse("SER515", "1", "Software Engineering", professor._id, [], [], []);
        expect(course.courseID).toBe("SER515");
        expect(course.sectionNumber).toBe("1");
        expect(course.courseName).toBe("Software Engineering");
        expect(course.professor._id.toString()).toBe(professor._id.toString());
    });
    it('should get all courses successfully', async () => {
        let course1 = await CourseDataController.addCourse("SER515", "1", "Software Engineering", professor._id, [], [], []);
        let course2 = await CourseDataController.addCourse("SER516", "2", "Software Testing", professor._id, [], [], []);
        let courses = await CourseDataController.getAllCourses();
        expect(courses.length).toBe(2);
        expect(courses[0]._id.toString()).toBe(course1._id.toString());
        expect(courses[1]._id.toString()).toBe(course2._id.toString());
    });
    it('should get a course by ID successfully', async () => {
        let course = await CourseDataController.addCourse("SER515", "1", "Software Engineering", professor._id, [], [], []);
        let retrievedCourse = await CourseDataController.getCourseById(course._id);
        expect(retrievedCourse).toBeDefined();
        expect(retrievedCourse._id.toString()).toBe(course._id.toString());
    });
    it('should update a course by ID successfully', async () => {
        let course = await CourseDataController.addCourse("SER515", "1", "Software Engineering", professor._id, [], [], []);
        let updatedCourse = await CourseDataController.updateCourseById(course._id, { courseName: "Software Engineering 2" });
        expect(updatedCourse.courseName).toBe("Software Engineering 2");
        expect(updatedCourse.courseID).toBe("SER515");
        expect(updatedCourse.sectionNumber).toBe("1");
        expect(updatedCourse.professor._id.toString()).toBe(professor._id.toString());
    });
    it('should delete a course by ID successfully', async () => {
        let courseToDelete = await CourseDataController.addCourse("SER515", "1", "Software Engineering", professor._id, [], [], []);
        let courseToStay = await CourseDataController.addCourse("SER516", "2", "Software Testing", professor._id, [], [], []);
        await CourseDataController.deleteCourseById(courseToDelete._id.toString());
        let courses = await CourseDataController.getAllCourses();
        expect(courses.length).toBe(1);
        expect(courses[0]._id.toString()).toBe(courseToStay._id.toString());
    });
    it('should delete all courses successfully', async () => {
        await CourseDataController.addCourse("SER515", "1", "Software Engineering", professor._id, [], [], []);
        await CourseDataController.addCourse("SER516", "2", "Software Testing", professor._id, [], [], []);
        await CourseDataController.deleteAllCourses();
        let courses = await CourseDataController.getAllCourses();
        expect(courses.length).toBe(0);
    });
});