require("../dependency fix.js");
const mongoose = require('mongoose');
const config = require("../../config/default.json");
const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.${config.DB_URL}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const FeedbackDataController = require("./feedback data controller.js");
const CourseDataController = require("./course data controller.js");
const UserDataController = require("./user data controller.js");

let student
let course

beforeAll(async () => {
    await mongoose.connect(uri);
    await FeedbackDataController.deleteAllFeedback();
});

beforeEach(async () => {
    await UserDataController.deleteAllUsers();
    await CourseDataController.deleteAllCourses();
    let professor = await UserDataController.addUser("John Doe", "johndoe", "password123", "professor", [], []);
    course = await CourseDataController.addCourse("SER515", "1", "Software Engineering", professor._id, [], [], []);
    student = await UserDataController.addUser("Jane Doe", "janedoe", "password123", "student", [], []);
});

afterEach(async () => {
    await FeedbackDataController.deleteAllFeedback();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Course Data Controller Test', () => {
    it('should add a feedback successfully', async () => {
        let feedback = await FeedbackDataController.addFeedback(course._id, student._id, "Great course!", 5);
        expect(feedback.course._id.toString()).toBe(course._id.toString());
        expect(feedback.student._id.toString()).toBe(student._id.toString());
        expect(feedback.description).toBe("Great course!");
        expect(feedback.rating).toBe(5);
    });
    it('should get all feedback successfully', async () => {
        let feedback1 = await FeedbackDataController.addFeedback(course._id, student._id, "Great course!", 5);
        let course2 = await CourseDataController.addCourse("SER516", "2", "Software Testing", course.professor._id, [], [], []);
        let student2 = await UserDataController.addUser("Jane Smith", "janesmith", "password123", "student", [], []);
        let feedback2 = await FeedbackDataController.addFeedback(course2._id, student2._id, "Good course!", 4);
        let feedbacks = await FeedbackDataController.getAllFeedback();
        expect(feedbacks.length).toBe(2);
        expect(feedbacks[0]._id.toString()).toBe(feedback1._id.toString());
        expect(feedbacks[1]._id.toString()).toBe(feedback2._id.toString());
        expect(feedbacks[0].course._id.toString()).toBe(course._id.toString());
        expect(feedbacks[1].course._id.toString()).toBe(course2._id.toString());
        expect(feedbacks[0].student._id.toString()).toBe(student._id.toString());
        expect(feedbacks[1].student._id.toString()).toBe(student2._id.toString());
        expect(feedbacks[0].description).toBe("Great course!");
        expect(feedbacks[1].description).toBe("Good course!");
        expect(feedbacks[0].rating).toBe(5);
        expect(feedbacks[1].rating).toBe(4);
    });
    it('should get a feedback by ID successfully', async () => {
        let feedback = await FeedbackDataController.addFeedback(course._id, student._id, "Great course!", 5);
        let feedbackById = await FeedbackDataController.getFeedbackById(feedback._id.toString());
        expect(feedbackById._id.toString()).toBe(feedback._id.toString());
        expect(feedbackById.course._id.toString()).toBe(course._id.toString());
        expect(feedbackById.student._id.toString()).toBe(student._id.toString());
        expect(feedbackById.description).toBe(feedback.description);
        expect(feedbackById.rating).toBe(feedback.rating);
    });
    it('should update a feedback by ID successfully', async () => {
        let feedback = await FeedbackDataController.addFeedback(course._id, student._id, "Great course!", 5);
        let updatedFeedback = await FeedbackDataController.updateFeedbackById(feedback._id.toString(), { description: "Updated feedback", rating: 4 });
        expect(updatedFeedback._id.toString()).toBe(feedback._id.toString());
        expect(updatedFeedback.course._id.toString()).toBe(course._id.toString());
        expect(updatedFeedback.student._id.toString()).toBe(student._id.toString());
        expect(updatedFeedback.description).toBe("Updated feedback");
        expect(updatedFeedback.rating).toBe(4);
    });
    it('should delete a feedback by ID successfully', async () => {
        let feedbackToDelete = await FeedbackDataController.addFeedback(course._id, student._id, "Great course!", 5);
        let course2 = await CourseDataController.addCourse("SER516", "2", "Software Testing", course.professor._id, [], [], []);
        let student2 = await UserDataController.addUser("Jane Smith", "janesmith", "password123", "student", [], []);
        let feedbackToKeep = await FeedbackDataController.addFeedback(course2._id, student2._id, "Good course!", 4);
        await FeedbackDataController.deleteFeedbackById(feedbackToDelete._id.toString());
        let feedbacks = await FeedbackDataController.getAllFeedback();
        expect(feedbacks.length).toBe(1);
        expect(feedbacks[0]._id.toString()).toBe(feedbackToKeep._id.toString());
        expect(feedbacks[0].course._id.toString()).toBe(course2._id.toString());
        expect(feedbacks[0].student._id.toString()).toBe(student2._id.toString());
        expect(feedbacks[0].description).toBe("Good course!");
        expect(feedbacks[0].rating).toBe(4);
    });
    it('should delete all feedbacks successfully', async () => {
        await FeedbackDataController.addFeedback(course._id, student._id, "Great course!", 5);
        let course2 = await CourseDataController.addCourse("SER516", "2", "Software Testing", course.professor._id, [], [], []);
        let student2 = await UserDataController.addUser("Jane Smith", "janesmith", "password123", "student", [], []);
        await FeedbackDataController.addFeedback(course2._id, student2._id, "Good course!", 4);
        await FeedbackDataController.deleteAllFeedback();
        let feedbacks = await FeedbackDataController.getAllFeedback();
        expect(feedbacks.length).toBe(0);
    });
});