const router = require('express').Router(),
nodeMailer = require('nodemailer'),
passport = require('passport'),
{ isUserExists } = require('../helpers/isUserExists'),
{ validUser } = require('../helpers/validUser'),
{ recaptchaValidation } = require('../helpers/recaptchaValidation'),
{ registerUser } = require('../helpers/registerUser'),
{ registerTransaction } = require('../helpers/registerTransaction'),
{ getBtcPrice } = require('../helpers/getBtcPrice'),
{ getUsdPrice } = require('../helpers/getUsdPrice'),
fetch = require('node-fetch'),
User = require('../models/users'),
Transaction = require('../models/transactionsBuy'),
{ sendEmail } = require('../helpers/sendEmail');

router.get('/buy/bitcoin', async (req, res) => {
    //console.log(req.session.passport.user);
    const cryptocurrency = {
        name: 'bitcoin',
        min: 0.01,
    };
    //
    const data = await getBtcPrice();
    const usdToArs = await getUsdPrice();
    console.log(data, usdToArs);
    res.render('buy/crypto', {
        cryptocurrency, data, usdToArs
    });
});

router.post('/buy/bitcoin', recaptchaValidation, validUser, sendEmail /*sendEmail envía un email con los datos de la operación*/, async(req, res) => {
    const {email, subject, message, amount, walletDir} = req.body;
    const emailPrototype = {
        receiver: email,
        subject: subject,
        message: message
    };
    if( registerTransaction(amount, walletDir, email) )
        await sendEmail({receiver: email, subject: subject}); // Envía el email de registro de cuenta

    await sendEmail(emailPrototype);
    req.flash('success_msg', 'No estabas registrado. Te hemos registrado con tu primer operación.');
    res.redirect('/user/sign-in');
    
});

module.exports = router;