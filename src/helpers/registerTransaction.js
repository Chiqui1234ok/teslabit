const   helpers = {};
const   Transaction = require('../models/transactionsBuy'),
        { isUserExists } = require('./isUserExists'),
        { registerUser } = require('./registerUser');

async function magic(walletDir, email, amount, usdToArs, btcLast) {
    console.log('magic:\namount:',amount,'\nbtcLast:',btcLast,'\nusdToArs:',usdToArs)
    const newTransaction = new Transaction({
        email: email,
        cryptocurrency: {
            name:       'bitcoin',
            price:      btcLast
        },
        payTo: {
            walletDir:  walletDir,        
            amount:     amount,
            totalInArs: (amount*btcLast)*usdToArs,
            totalInUsd: amount*btcLast          
        },
        dollar: usdToArs
    });
    await newTransaction.save();
    return newTransaction;
}

helpers.registerTransaction = async function(amount, walletDir, email, usdToArs, btcLast) {
    if(btcLast == 0) {
        req.flash('error_msg', 'Imposible obtener el precio del Bitcoin en estos momentos.');
        res.redirect('/');
    } else {
        if( isUserExists(email) ) 
            return await magic(walletDir, email, amount, usdToArs, btcLast);
        else {
            registerUser(); // Si el usuario no existe, lo va a crear
            return await magic(walletDir, email, amount, usdToArs, btcLast);
        }
    }
}

module.exports = helpers;