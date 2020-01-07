const router = require('express').Router(),
{ isUserExists } = require('../helpers/isUserExists'),
{ validUser } = require('../helpers/validUser'),
fetch = require('node-fetch'),
User = require('../models/users'),
Transaction = require('../models/transactionsBuy'),
{ sendEmail } = require('../helpers/sendEmail');

router.get('/buy/bitcoin', async (req, res) => {
    const cryptocurrency = {
        name: 'bitcoin',
        min: 0.01,
    };
    const usdToArs = 76;
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        data.last = (data.last*1.05).toFixed(2);
        res.render('buy/crypto', {
            cryptocurrency, data, usdToArs
        });
    });
});

router.post('/buy/bitcoin', validUser, /*sendEmail,*/ async(req, res) => {
    const {amount, walletDir, email, password, password2} = req.body;
    // Refrescar el precio del BTC
    let lastPrice = 0;
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        lastPrice = (data.last*1.05).toFixed(2);
    });
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
            req.flash('error', 'Este usuario no existe.');
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
    //
    //
    // const newTransaction = new Transaction({
    //     email: email,
    //     cryptocurrency: {
    //         name:       'bitcoin',
    //         price:      lastPrice
    //     },
    //     payTo: {
    //         walletDir:  walletDir,        
    //         amount:     amount       
    //     }
    // });
    // await newTransaction.save();
    // res.render('buy/finish', {amount, lastPrice, walletDir, email});
});


module.exports = router;