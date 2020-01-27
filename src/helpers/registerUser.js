const helpers = {};
const User = require('../models/users'),
{ isUserExists } = require('../helpers/isUserExists');

helpers.registerUser = async function(email, password) {
    const user = await isUserExists(email);
    if(user) { // Si el usuario existe, no lo vuelvo a crear y notifico el error en caso de que las contraseñas no coincidan
        console.log(user);
        const match = await user.matchPassword(password);
        return false; // No se creó el usuario, porque ya existe :P
    } else { // Si el usuario no existe, lo creo
        const newUser = new User({email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        return newUser;
    } 
}

module.exports = helpers;