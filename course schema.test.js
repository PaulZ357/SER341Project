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
  await User.deleteMany({});
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

  it('should fail to create a user without a name', async () => {
    const userWithoutRequiredField = new User({
      username: 'johndoe',
      password: 'password123',
      type: 'student',
      courses: [],
      feedbacks: []
    });
    let err;
    try {
      await recipeWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });

  it('should fail to create a user without a username', async () => {
    const userWithoutRequiredField = new User({
      name: 'John Doe',
      password: 'password123',
      type: 'student',
      courses: [],
      feedbacks: []
    });
    let err;
    try {
      await recipeWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });

  it('should fail to create a user without a password', async () => {
    const userWithoutRequiredField = new User({
      name: 'John Doe',
      username: 'johndoe',
      type: 'student',
      courses: [],
      feedbacks: []
    });
    let err;
    try {
      await recipeWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });

  it('should fail to create a user without a type', async () => {
    const userWithoutRequiredField = new User({
      name: 'John Doe',
      username: 'johndoe',
      password: 'password123',
      courses: [],
      feedbacks: []
    });
    let err;
    try {
      await recipeWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });

  it('should fail to create a recipe with a duplicate username', async () => {
    const user = new User({
      name: 'John Doe',
      username: 'johndoe',
      password: 'password123',
      type: 'student',
      courses: [],
      feedbacks: []
    });
    await recipe.save();
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
      await duplicateRecipe.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.username).toBeDefined();
  });
});