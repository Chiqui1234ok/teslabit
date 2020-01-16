const router = require('express').Router(),
{ isUserExists } = require('../helpers/isUserExists'),
{ validUser } = require('../helpers/validUser'),
{ recaptchaValidation } = require('../helpers/recaptchaValidation'),
fetch = require('node-fetch'),
User = require('../models/users'),
Transaction = require('../models/transactionsBuy'),
{ sendEmail } = require('../helpers/sendEmail');

router.get('/buy/bitcoin', async (req, res) => {
    const cryptocurrency = {
        name: 'bitcoin',
        min: 0.01,
    };
    //
    let usdToArs = 80;
    await fetch('https://argentina-hoy.herokuapp.com/devs/dolar-hoy', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        usdToArs = data.sell.official*1.3; // impuesto de 30%
    });
    
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        data.last = data.last; // antes -> data.last*1.05
        res.render('buy/crypto', {
            cryptocurrency, data, usdToArs
        });
    })
    .catch(data.last = 81);
});

router.post('/buy/bitcoin', validUser, recaptchaValidation, sendEmail, async(req, res) => {
    const {amount, walletDir, email, password, password2} = req.body;
    // Refrescar el precio del BTC
    let lastPrice = 81;
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        lastPrice = data.last; // antes -> data.last*1.05
    })
    .catch(lastPrice = 81.9);
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
            req.flash('error', 'Este usuario existe pero la contraseña no concuerda');
            res.redirect('/user/sign-in');
            //next();
        }
    } else {
        if(!password2) {
            req.flash('error', 'Este email no está registrado. Debes confirmar tu contraseña para registrar tu usuario y operación');
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
            req.flash('success_msg', 'No estabas registrado. Te hemos registrado con tu primer operación.');
            res.redirect('/user/sign-in');
        }
    }
});

module.exports = router;