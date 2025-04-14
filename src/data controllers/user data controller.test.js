require("../dependency fix.js");
const mongoose = require('mongoose');
const config = require("../../config/default.json");
const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.${config.DB_URL}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const UserDataController = require("./user data controller.js");

beforeAll(async () => {
    await mongoose.connect(uri);
    await UserDataController.deleteAllUsers();
});

afterEach(async () => {
    await UserDataController.deleteAllUsers();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Course Data Controller Test', () => {
    it('should add a user successfully', async () => {
        let user = await UserDataController.addUser("John Doe", "johndoe", "password123", "student", [], []);
        expect(user.name).toBe("John Doe");
        expect(user.username).toBe("johndoe");
        expect(user.password).toBe("password123");
        expect(user.type).toBe("student");
    });
    it('should get all users successfully', async () => {
        let user1 = await UserDataController.addUser("John Doe", "johndoe", "password123", "student", [], []);
        let user2 = await UserDataController.addUser("Jane Doe", "janedoe", "password456", "professor", [], []);
        let users = await UserDataController.getAllUsers();
        expect(users.length).toBe(2);
        expect(users[0]._id.toString()).toBe(user1._id.toString());
        expect(users[1]._id.toString()).toBe(user2._id.toString());
    });
    it('should get a user by ID successfully', async () => {
        let user = await UserDataController.addUser("John Doe", "johndoe", "password123", "student", [], []);
        let retrievedUser = await UserDataController.getUserById(user._id);
        expect(retrievedUser).toBeDefined();
        expect(retrievedUser._id.toString()).toBe(user._id.toString());
    });
    it('should update a user by ID successfully', async () => {
        let user = await UserDataController.addUser("John Doe", "johndoe", "password123", "student", [], []);
        let updatedUser = await UserDataController.updateUserById(user._id.toString(), { name: "Jane Doe" });
        expect(updatedUser.name).toBe("Jane Doe");
        expect(updatedUser.username).toBe("johndoe");
        expect(updatedUser.password).toBe("password123");
    });
    it('should delete a user by ID successfully', async () => {
        let userToDelete = await UserDataController.addUser("John Doe", "johndoe", "password123", "student", [], []);
        let userToStay = await UserDataController.addUser("Jane Doe", "janedoe", "password456", "professor", [], []);
        await UserDataController.deleteUserById(userToDelete._id.toString());
        let users = await UserDataController.getAllUsers();
        expect(users.length).toBe(1);
        expect(users[0]._id.toString()).toBe(userToStay._id.toString());
    });
    it('should delete all users successfully', async () => {
        await UserDataController.addUser("John Doe", "johndoe", "password123", "student", [], []);
        await UserDataController.addUser("Jane Doe", "janedoe", "password456", "professor", [], []);
        await UserDataController.deleteAllUsers();
        let users = await UserDataController.getAllUsers();
        expect(users.length).toBe(0);
    });
});