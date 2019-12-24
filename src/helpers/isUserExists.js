const helpers = {};
const User = require('../models/users');

// Si el usuario NO existe, te redirije al sign-up

helpers.isUserExists = async (req, res, next) => { // middleware
    const errors = [];
    const email = req.body.email, password = req.body.password;
    // console.log(email, password);
    const user = await User.findOne({email: email});
    if(user) {
        const match = await user.matchPassword(password);
        if(match)
        {
            next();
        } else {
            req.flash('Este usuario existe pero la contraseña no concuerda');
            res.redirect('/user/sign-in');
        }
    } else {
        req.flash('Este usuario no existe y puedes crearlo.')
        res.redirect('/user/sign-up');
    }
}    
module.exports = helpers;