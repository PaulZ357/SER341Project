const mongoose = require('mongoose');
const uri = `mongodb+srv://node-user:node-app123@cluster0.xwwvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const User = require("./user schema");

let mongoServer;

beforeAll(async () => {
  await mongoose.connect(uri);
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('User Model Test', () => {
  it('should create & save a course successfully', async () => {
    const validUser = new User({
      name: 'John Doe',
      username: 'johndoe',
      password: 'password123',
      type: 'student',
      courses: [],
      feedbacks: []
    });
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(validUser.name);
    expect(savedUser.username).toBe(validUser.username);
    expect(savedUser.password).toBe(validUser.password);
    expect(savedUser.type).toBe(validUser.type);
    expect(savedUser.courses).toBe(validUser.courses);
    expect(savedUser.feedbacks).toBe(validUser.feedbacks);
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
      await userWithoutRequiredField.save();
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
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.username).toBeDefined();
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
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
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
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.type).toBeDefined();
  });

  it('should fail to create a recipe with a duplicate username', async () => {
    const course = new User({
      name: 'John Doe',
      username: 'johndoe',
      password: 'password123',
      type: 'student',
      courses: [],
      feedbacks: []
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