const database = require("../fake-db");

const findOne = (uname) => {
    const user = database.find(user => user.uname === uname);
    if (user) {
        return user;
    }

    throw new Error(`Couldn't find user with user name: ${uname}`);
}

const findById = (id) => {
    const user = database.find(user => user.id === id);
    if (user) {
        return user;
    }
    
    throw new Error(`Couldn't find user with id: ${id}`);
}

module.exports = {findOne, findById};