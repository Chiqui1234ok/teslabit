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
    const data = await getBtcPrice(); // data = btcData
    const usdToArs = await getUsdPrice();
    // console.log(data, usdToArs);
    res.render('buy/crypto', {
        cryptocurrency, data, usdToArs
    });
});

router.post('/buy/bitcoin', recaptchaValidation, validUser/*, sendEmail sendEmail envía un email con los datos de la operación*/, async(req, res) => {
    const {email, password, subject, message, amount, walletDir} = req.body;
    const btcData = await getBtcPrice();
    const usdToArs = await getUsdPrice();
    if( await registerTransaction(amount, walletDir, email, password, usdToArs, btcData) ) { // si el usuario existe y coinciden las pass, o bien el usuario no existía y se creó
        req.flash('success_msg', '¡Todo bien! Te aprobaremos en 24 horas o menos.');
        await sendEmail(email, subject, message); // Envía el email de la operación
    } else { // si no coinciden las pass
        req.flash('error_msg', 'Tus contraseñas parecen no coincidir.');
        res.redirect('/buy/bitcoin');
    }
    res.redirect('/');
});

module.exports = router;