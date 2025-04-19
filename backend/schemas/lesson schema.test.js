const mongoose = require('mongoose');
const config = require("../config/default.json");
const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.${config.DB_URL}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const Lesson = require("./lesson schema");
const Course = require("./course schema");
const User = require("./user schema");
let course;

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
  });
  await Lesson.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Lesson.deleteMany({});
});

describe('Lesson Model Test', () => {
  it('should create & save a course successfully', async () => {
    const validLesson = new Lesson({
      feedbacks: [],
      course: course,
    });
    const savedLesson = await validLesson.save();
    expect(savedLesson._id).toBeDefined();
    expect(savedLesson.feedbacks).toBe(validLesson.feedbacks);
    expect(savedLesson.course).toBe(validLesson.course);
  });

  it('should fail to create a lesson without a course', async () => {
    const lessonWithoutRequiredField = new Lesson({
      feedbacks: [],
    });
    let err;
    try {
      await lessonWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.course).toBeDefined();
  });
});