const   helpers = {};
const   emailValidator = require('email-validator'),
        User = require('../models/users');

helpers.isUserExists = async function (email) {
    if(emailValidator.validate(email)) {
        const user = await User.findOne({email: email});
        return user;
    } else
        req.flash('error_msg', 'Este email es inválido.');
    return false;
}    

module.exports = helpers;