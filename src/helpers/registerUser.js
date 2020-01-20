const helpers = {};
const User = require('../models/users'),
{ isUserExists } = require('../helpers/isUserExists'),
{ sendEmail } = require('../helpers/sendEmail');

helpers.registerUser = async(req, res) => {
    const { email, password } = req.body;
    const data = {
        email: req.body.email,
        password: req.body.password
    };
    const user = await isUserExists(data);
    if(user) {
        console.log(user);
        const match = await user.matchPassword(data.password);
        if(!match)
            req.flash('error_msg', 'El usuario existe, aunque la contraseña es incorrecta');
        return false; // No creó el usuario
    } else {
        const newUser = new User({email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        // El email se debe enviar APARTE
        req.flash('success_msg', '¡Ya te registraste! Inicia sesión.');
    }   return true; // Creó el usuario
}

module.exports = helpers;