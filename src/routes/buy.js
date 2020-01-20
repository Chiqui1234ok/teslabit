const router = require('express').Router(),
nodeMailer = require('nodemailer'),
passport = require('passport'),
{ isUserExists } = require('../helpers/isUserExists'),
{ validUser } = require('../helpers/validUser'),
{ recaptchaValidation } = require('../helpers/recaptchaValidation'),
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
    let usdToArs = 81.9;
    await fetch('https://argentina-hoy.herokuapp.com/devs/dolar-hoy', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        usdToArs = data.sell.official*1.3; // impuesto de 30%
    })
    .catch(usdToArs = 81.9);
    
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        data.last = data.last; // antes -> data.last*1.05
        res.render('buy/crypto', {
            cryptocurrency, data, usdToArs
        });
    })
    .catch(req.flash('error_msg', 'Imposible obtener el precio del Bitcoin, intenta luego.'));
});

router.post('/buy/bitcoin', recaptchaValidation, validUser, sendEmail, async(req, res) => {
    const {amount, walletDir, email, password, password2} = req.body;
    // Refrescar el precio del BTC
    let lastPrice = 81.9;
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        lastPrice = data.last; // antes -> data.last*1.05
    });
    // .catch(req.flash('error_msg', 'Imposible obtener el precio del Bitcoin, intenta luego.'));
    //
    const user = await User.findOne({email: email});
    if(user) {
        const match = await user.matchPassword(password);
        if(match) {
            //
            const newTransaction = new Transaction({
                email: email,
                cryptocurrency: {
                    name:       'bitcoin',
                    price:      lastPrice
                },
                payTo: {
                    walletDir:  walletDir,        
                    amount:     amount       
                }
            });
            await newTransaction.save();
            res.render('buy/finish', {amount, lastPrice, walletDir, email});
            //
        } else {
            req.flash('error_msg', 'Este usuario existe pero la contraseña no concuerda');
            res.redirect('/user/sign-in');
            //next();
        }
    } else {
        if(!password2) {
            req.flash('error_msg', 'Este email no está registrado. Debes confirmar tu contraseña para registrar tu usuario y operación');
            res.redirect('/buy/bitcoin');
        } else {
            const newUser = new User({email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            //
            const newTransaction = new Transaction({
                email: email,
                cryptocurrency: {
                    name:       'bitcoin',
                    price:      lastPrice
                },
                payTo: {
                    walletDir:  walletDir,        
                    amount:     amount       
                }
            });
            await newTransaction.save();
            // EMAIL DE REGISTRO (copia de sendEmail.js)
            const { subject } = req.body;
            let transporter = nodeMailer.createTransport({    
                host: 'mail.teslabit.net',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.NO_REPLY_EMAIL_DIR || 'no-responder@teslabit.net',
                    pass: 'lilolilo007'
                }
            });
            let data = {
                from: process.env.NO_REPLY_EMAIL_DIR || 'no-responder@teslabit.net',
                to: email,
                subject: subject,
                // body: message
                // text: message
                html: "<p>¡Bienvenido a Teslabit! Tu cuenta ya se encuentra activada.</p><p>Recuerda que para operar, debes enviarnos el frente y reverso de tu DNI a <a href='mailto:administracion@teslabit.net'>administracion@teslabit.net</a>.</p><p>¡Disfruta de nuestro exchange!</p>"
            };
            await transporter.sendMail(data, (err, res) => {
                if(err)
                    req.flash('Ha sido imposible enviarte el email. Prueba luego.');
                // else
                //     req.flash('¡Hemos enviado el email!');
            });
            // !EMAIL DE REGISTRO (copia de sendEmail.js)
            req.flash('success_msg', 'No estabas registrado. Te hemos registrado con tu primer operación.');
            res.redirect('/user/sign-in');
        }
    }
});

module.exports = router;