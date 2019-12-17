const router = require('express').Router(),
{ isUserExists } = require('../helpers/isUserExists'),
fetch = require('node-fetch'),
Transaction = require('../models/transactionsBuy'),
{ sendBuyEmail } = require('../helpers/sendBuyEmail');

router.get('/buy/bitcoin', async (req, res) => {
    const cryptocurrency = {
        name: 'bitcoin',
        min: 0.05,
    };
    const usdToArs = 63;
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        res.render('buy/crypto', {
            cryptocurrency, data, usdToArs
        });
    });
});

router.post('/buy/bitcoin', isUserExists, async(req, res) => {
    const {amount, walletDir, email, password} = req.body;
    //
    let lastPrice = 0;
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'Get'})
    .then(res => res.json())
    .then((data) => {
        lastPrice = data.last;
    });
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
});


module.exports = router;