const userModel = require("../models/userModel");

const getUserByUnameAndPassword = (uname, password) => {
    let user = userModel.findOne(uname);
    if (user) {
        if (isUserValid(user, password)) {
            return user;
        }
    }

    return null;
};

const getUserById = (id) => {
    return userModel.findById(id);
};
  
function isUserValid(user, password) {
    return user.password === password;
}
  
module.exports = {getUserByUnameAndPassword, getUserById};