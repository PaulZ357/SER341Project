const User = require("../schemas/user schema.js");


async function addUser(name, username, password, type, courses, feedbacks) {
    const user = new User({
        name: name,
        username: username,
        password: password,
        type: type,
        courses: courses,
        feedbacks: feedbacks
    });
    return await user.save();
}

async function getAllUsers() {
    require("../schemas/course schema.js");
    require("../schemas/feedback schema.js");
    return await User.find().populate('courses').populate('feedbacks').exec();
}

async function getUserById(userID) {
    return await getAllUsers().then(users => {
        return users.find(user => user._id.toString() === userID.toString());
    });
}

async function updateUserById(userID, updatedUser) {
    return await User.findByIdAndUpdate(userID, updatedUser, { new: true });
}

async function deleteUserById(userID) {
    return await User.findByIdAndDelete(userID);
}

async function deleteAllUsers() {
    return await User.deleteMany({});
}

module.exports = {
    addUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
    deleteAllUsers
};