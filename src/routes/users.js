const router = require('express').Router(),
User = require('../models/users'),
passport = require('passport'),
{ validUser } = require('../helpers/validUser'),
{ isUserExists } = require('../helpers/isUserExists'), 
{ registerUser } = require('../helpers/registerUser'),
{ recaptchaValidation } = require('../helpers/recaptchaValidation'),
{ sendEmail } = require('../helpers/sendEmail'),
Transaction = require('../models/transactionsBuy');


router.get('/user/sign-in', (req, res) => {
        res.render('user/sign-in');
});

router.post('/user/sign-in', passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/sign-in',
    failureFlash: true
}), (req, res) => {
    //console.log(req.body.passport);
});

router.get('/user/sign-up', (req, res) => {
    res.render('user/sign-up');
});

router.post('/user/sign-up', recaptchaValidation, validUser, async (req, res) => {
    const { email, password } = req.body;
    if( await isUserExists(email) ) {
        req.flash('error_msg', 'Este email ya existe, prueba con otra contraseña.');
        res.redirect('/user/sign-in');
    } else {
        await registerUser(email, password);
        await sendEmail(email, req.body.subject, req.body.message);
        req.flash('success_msg', '¡Que bien! Ya estás registrado.');
        res.redirect('/user/sign-in'); 
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

router.get('/user/log-out', (req, res) => {
    req.logout();
    res.redirect('/user/sign-in');
});

module.exports = router;