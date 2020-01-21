const helpers = {};
const User = require('../models/users'),
{ isUserExists } = require('../helpers/isUserExists');

helpers.registerUser = async(req, res, next) => {
    const { email, password } = req.body;
    const data = {
        email: req.body.email,
        password: req.body.password
    };
    const user = await isUserExists(data.email);
    if(user) { // Si el usuario existe, no lo vuelvo a crear y notifico el error en caso de que las contraseñas no coincidan
        console.log(user);
        const match = await user.matchPassword(data.password);
        if(!match)
            req.flash('error_msg', 'El usuario existe, aunque la contraseña es incorrecta');
    } else { // Si el usuario no existe, lo creo
        const newUser = new User({email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        // El email se debe enviar APARTE
        req.flash('success_msg', '¡Ya te registraste! Inicia sesión.');
    }   //return true; // Creó el usuario
    next();
}

module.exports = helpers;