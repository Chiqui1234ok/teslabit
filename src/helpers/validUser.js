const helpers = {};

// Si el nuevo usuario NO tiene sus datos completos o las contraseñas no coinciden, te envío al sign-up de nuevo

helpers.validUser = async (req, res, next) => { // middleware
    const errors = [];
    const { email, password1, password2 } = req.body;
    if(!email)
        errors.push({text: 'Completa el email.'});
    if(!password1 || !password2)
        errors.push({text: 'Inserta la contraseña.'});
    if(password1 != password2)
        errors.push({text: 'Las contraseñas no coinciden.'});
    if(password1.lenght < 8)
        errors.push({text: 'La contraseña debe tener al menos 8 caracteres.'});
    if(errors.length > 0) {
        res.render('user/sign-up', {
            errors,
            email
        });
    } else {
        next();
    }
}    
module.exports = helpers;