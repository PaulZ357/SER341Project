const mongoose = require('mongoose');
const uri = `mongodb+srv://node-user:node-app123@cluster0.xwwvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const Feedback = require("./feedback schema");
const Course = require("./course schema");
const User = require("./user schema");
let mongoServer;
let course;
let student;

beforeAll(async () => {
  await mongoose.connect(uri);
  course = new Course({
    courseID: "SER341",
    sectionNumber: "01",
    courseName: "Software Engineering",
    professor: new User({
      name: 'John Doe',
      username: 'johndoe',
      password: 'password123',
      type: 'professor',
      courses: [course],
      feedbacks: []
    }),
    assignments: [1, 2, 3],
    lessons: [],
    students: []
  }),
  student = new User({
    name: "Seth Rogers",
    username: "sethrogers",
    password: "password123",
    type: "student",
    courses: [course],
    feedbacks: []
  });
  await Feedback.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Feedback.deleteMany({});
});

describe('Recipe Model Test', () => {
  it('should create & save a course successfully', async () => {
    const validFeedback = new Feedback({
      course: course,
      student: student,
      description: "Great course!",
      rating: 5
    });

    const savedFeedback = await validFeedback.save();
    expect(savedFeedback._id).toBeDefined();
    expect(savedFeedback.course).toBe(validFeedback.course);
    expect(savedFeedback.student).toBe(validFeedback.student);
    expect(savedFeedback.description).toBe(validFeedback.description);
    expect(savedFeedback.rating).toBe(validFeedback.rating);

  });

  it('should fail to create a feedback without a course', async () => {
    const feedbackWithoutRequiredField = new Feedback({
      student: student,
      description: "Great course!",
      rating: 5
    });
    let err;
    try {
      await feedbackWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.course).toBeDefined();
  });

  it('should fail to create a feedback without a student', async () => {
    const feedbackWithoutRequiredField = new Feedback({
      course: course,
      description: "Great course!",
      rating: 5
    });
    let err;
    try {
      await feedbackWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.student).toBeDefined();
  });

  it('should fail to create a feedback without a description', async () => {
    const feedbackWithoutRequiredField = new Feedback({
      course: course,
      student: student,
      rating: 5
    });
    let err;
    try {
      await feedbackWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.description).toBeDefined();
  });

  it('should fail to create a feedback without a rating', async () => {
    const feedbackWithoutRequiredField = new Feedback({
      course: course,
      student: student,
      description: "Great course!",
    });
    let err;
    try {
      await feedbackWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.rating).toBeDefined();
  });

  it('should fail to create a feedback with an invalid rating', async () => {
    const feedbackWithoutRequiredField = new Feedback({
      course: course,
      student: student,
      description: "Great course!",
      rating: 6 // Invalid rating
    });
    let err;
    try {
      await feedbackWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.rating).toBeDefined();
  });
});