const mongoose = require('mongoose');
const uri = `mongodb+srv://node-user:node-app123@cluster0.xwwvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const Course = require("./course schema");
const User = require("./user schema");
let mongoServer;

beforeAll(async () => {
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Course.deleteMany({});
});

describe('Recipe Model Test', () => {
  it('should create & save a course successfully', async () => {
    const validCourse = new Course({
      courseID: "SER341",
      sectionNumber: "01",
      courseName: "Software Engineering",
      professor: new User({
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
        type: 'student',
        courses: [],
        feedbacks: []
      }),
      assignments: [1, 2, 3],
      lessons: [],
      students: []
    });
    const savedCourse = await validCourse.save();
    expect(savedCourse._id).toBeDefined();
    expect(savedCourse.courseID).toBe(validCourse.courseID);
    expect(savedCourse.sectionNumber).toBe(validCourse.sectionNumber);
    expect(savedCourse.courseName).toBe(validCourse.courseName);
    expect(savedCourse.professor).toBe(validCourse.professor);
    expect(savedCourse.assignments).toBe(validCourse.assignments);
  });

  it('should fail to create a course without a courseID', async () => {
    const courseWithoutRequiredField = new Course({
      sectionNumber: "01",
      courseName: "Software Engineering",
      professor: new User({
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
        type: 'student',
        courses: [],
        feedbacks: []
      }),
      assignments: [1, 2, 3],
      lessons: [],
      students: []
    });
    let err;
    try {
      await courseWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.courseID).toBeDefined();
  });

  it('should fail to create a course without a sectionNumber', async () => {
    const courseWithoutRequiredField = new Course({
      courseID: "SER341",
      courseName: "Software Engineering",
      professor: new User({
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
        type: 'student',
        courses: [],
        feedbacks: []
      }),
      assignments: [1, 2, 3],
      lessons: [],
      students: []
    });
    let err;
    try {
      await courseWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.sectionNumber).toBeDefined();
  });

  it('should fail to create a course without a courseName', async () => {
    const courseWithoutRequiredField = new Course({
      courseID: "SER341",
      sectionNumber: "01",
      professor: new User({
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
        type: 'student',
        courses: [],
        feedbacks: []
      }),
      assignments: [1, 2, 3],
      lessons: [],
      students: []
    });
    let err;
    try {
      await courseWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.courseName).toBeDefined();
  });

  it('should fail to create a course without a professor', async () => {
    const courseWithoutRequiredField = new Course({
      courseID: "SER341",
      sectionNumber: "01",
      courseName: "Software Engineering",
      assignments: [1, 2, 3],
      lessons: [],
      students: []
    });
    let err;
    try {
      await courseWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.professor).toBeDefined();
  });

  it('should fail to create a course with a duplicate courseID', async () => {
    const course = new Course({
      courseID: "SER341",
      sectionNumber: "01",
      courseName: "Software Engineering",
      professor: new User({
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
        type: 'student',
        courses: [],
        feedbacks: []
      }),
      assignments: [1, 2, 3],
      lessons: [],
      students: []
    });
    await course.save();
    const duplicateUser = new User({
      name: 'Bob Smith',
      username: 'johndoe', // Duplicate username
      password: 'password456',
      type: 'professor',
      courses: [],
      feedbacks: []
    });
    let err;
    try {
      await duplicateUser.save();
      fail("Expected duplicate username error to be thrown");
    } catch (error) {
      err = error;
    }
  });
});