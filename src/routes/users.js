const router = require('express').Router(),
User = require('../models/users'),
passport = require('passport'), // Autentica al usuario
// const { isLogin } = require('../helpers/auth');
{ validUser } = require('../helpers/validUser'), // Chequea que el usuario que se está por crear tenga <input> válidos
{ isUserExists } = require('../helpers/isUserExists'),
Transaction = require('../models/transactionsBuy');


router.get('/user/sign-in', (req, res) => {
        res.render('user/sign-in');
});

router.post('/user/sign-in', passport.authenticate('local', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/sign-in',
    failureFlash: true
}), (req, res) => {
    // console.log(user);
});

router.get('/user/sign-up', (req, res) => {
    res.render('user/sign-up');
});

router.post('/user/sign-up', validUser, async (req, res) => {
    const { email, password1, password2 } = req.body;
    const errors = [];
    const userExists = await User.findOne({email: email});
    if(userExists) {
        req.flash('error', 'Este usuario ya existe.');
        res.redirect('/user/sign-up');
    } else {
        const newUser = new User({email, password1});
        newUser.password = await newUser.encryptPassword(password1);
        await newUser.save();
        req.flash('success_msg', '¡Estás registrado! Iniciá sesión.');
        res.redirect('/user/sign-in');
    }
});

router.get('/user/profile', async (req, res) => {
    console.log(req.session.passport.user);
    const id = req.session.passport.user; // Esto se tendrá que recibir por cookies/sesión
    const user = await User.findById({_id: id});
    const transactions = await Transaction.find({email: user.email});    let allTransactions;
    if(user.isAdmin) {
        allTransactions = await Transaction.find({finished: false});
    }
    res.render('user/profile', {user, transactions, allTransactions});
});

router.get('/user/log-out',(req, res) => {
    req.logout();
    res.redirect('/user/sign-in');
});

module.exports = router;