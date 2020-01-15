const router = require('express').Router(),
User = require('../models/users'),
passport = require('passport'),
{ validUser } = require('../helpers/validUser'),
{ isUserExists } = require('../helpers/isUserExists'),
{ recaptchaValidation } = require('../helpers/recaptchaValidation'),
{ sendEmail } = require('../helpers/sendEmail'),
Transaction = require('../models/transactionsBuy');


router.get('/user/sign-in', (req, res) => {
        res.render('user/sign-in');
});

router.post('/user/sign-in', recaptchaValidation, passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/sign-in',
    failureFlash: true
}), (req, res) => {
    // console.log(user);
});

router.get('/user/sign-up', (req, res) => {
    res.render('user/sign-up');
});

router.post('/user/sign-up', validUser, isUserExists, recaptchaValidation, sendEmail, async (req, res) => { // agregué isUserExists, falta probar
    // OJO isUserExists registra al usuario. Tendria que revisar como organizo ese helper en relación a esta ruta
    const { email, password, password2 } = req.body;
    const errors = [];
    const userExists = await User.findOne({email: email});
    if(userExists) {
        req.flash('error', 'Este usuario ya existe.');
        res.redirect('/user/sign-in');
    } else {
        if(password != password2) {
            req.flash('error_msg', 'Las contraseñas no coinciden');
            res.redirect('/usr/sign-up');
        } else {
            const newUser = new User({email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', '¡Ya te registraste! Inicia sesión.');
            res.redirect('/user/sign-in');
        }
    }
});

router.get('/user/profile', async (req, res) => {
    //console.log(req.session.passport.user);
    const id = req.session.passport.user; // Esto se tendrá que recibir por cookies/sesión
    const user = await User.findById({_id: id});
    const transactions = await Transaction.find({email: user.email});
    let allTransactions;
    if(user.isAdmin)
        allTransactions = await Transaction.find({finished: false}).limit(5);
    res.render('user/profile', {user, transactions, allTransactions});
});

router.get('/user/log-out',(req, res) => {
    req.logout();
    res.redirect('/user/sign-in');
});

module.exports = router;