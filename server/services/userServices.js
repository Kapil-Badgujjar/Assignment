const User = require('../models/userModel');

async function addUser(username, email, password) {
    try {
        await User.create({ username, email, password});
    } catch(err) {
        throw err;
    }
}

async function findUser(email, password) {
    try {
        return await User.findOne({email, password});
    } catch(err) {
        throw err;
    }
}

async function getUser(email) {
    try {
        return await User.findOne({email});
    } catch(err) {
        throw err;
    }
}

async function getAllUsers() {
    try {
        return await User.find();
    } catch(err) {
        throw err;
    }
}

module.exports = { addUser, findUser, getUser, getAllUsers };