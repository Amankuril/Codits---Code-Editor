const userModel = require('../models/user.model.js');



module.exports.createUser = async({
    username, password, email
}) => {

    if (!username || !password || !email) {
        throw new Error('All fields are required');
    }

    const user = userModel.create({
        username,
        password,
        email
    });

    return user;
}