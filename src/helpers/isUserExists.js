const   helpers = {};
const   emailValidator = require('email-validator'),
        User = require('../models/users');

helpers.isUserExists = async function (data) { // middleware
    if(emailValidator.validate(data.email)) {
        const user = await User.findOne({email: data.email});
        return user?user:false;
    } else
        req.flash('error_msg', 'Este usuario no existe.');
    return false;
}    

module.exports = helpers;