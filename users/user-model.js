const db = require('../database/dbConfig.js');

module.exports = {
    getUsers,
    getUserById,
    getUserBy,
    addUser
}

function getUsers() {
    return db('users');
}

function getUserById(id) {
    return db('users')
        .where({ id })
        .first();
}

function getUserBy(filter) {
    return db('users')
        .where(filter)
        .first();
}

async function addUser(user) {
    const id = await db('users')
        .insert(user);
    return getUserById(id);
}