const helpers = {};

helpers.isLogin = (req, res, next) => { // middleware
    if(req.isAuthenticated()) { // fx desde passport
        return next();
    }
    // req.flash('error', 'Tienes que iniciar sesión para ver esta página');
    const errors = [{text: 'Tienes que iniciar sesión para ver esta página'}];
    res.render('user/sign-in', {errors});
};

module.exports = helpers;