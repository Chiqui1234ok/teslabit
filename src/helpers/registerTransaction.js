const   helpers = {};
const   Transaction = require('../models/transactionsBuy'),
        User = require('../models/users'),
        { isUserExists } = require('./isUserExists'),
        { registerUser } = require('./registerUser'),
        { sendEmail } = require('./sendEmail');

async function magic(walletDir, email, amount, usdToArs, btcLast) {
    const today = new Date();
    const   dd = today.getDate(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear();
    const newTransaction = new Transaction({
        email: email,
        cryptocurrency: {
            name:       'bitcoin',
            price:      btcLast
        },
        payTo: {
            walletDir:  walletDir,        
            amount:     amount,
            totalInArs: ( ((amount*btcLast)*usdToArs)*1.05).toFixed(0),
            totalInUsd: ( (amount*btcLast)*1.05 ).toFixed(0) 
        },
        dollar: usdToArs,
        date: dd+'/'+mm+'/'+yyyy
    });
    await newTransaction.save();
    return newTransaction;
}

helpers.registerTransaction = async function(amount, walletDir, email, password, usdToArs, btcLast) {
    if(btcLast == 0) {
        req.flash('error_msg', 'Imposible obtener el precio del Bitcoin en estos momentos.');
        res.redirect('/');
    } else if(amount < 0.01 || usdToArs < 80) {
        req.flash('error_msg', 'Los montos de la calculadora son incorrectos.');
        res.redirect('/');
    } else {
        if( user = await isUserExists(email) ) {
            // console.log('registerTransaction says: "El usuario ya existe, ¡mira!"\n', user);
            const match = await user.matchPassword(password);
            if( match ) // Si el usuario existe y su contraseña es correcta, creo la transacción
                return await magic(walletDir, email, amount, usdToArs, btcLast);
            return false; // si no coincide la pass = false
        } else {
            await registerUser(email, password); // Si el usuario no existe, lo va a crear -> AGREGO 'AWAIT'
            await sendEmail(email);
            // console.log('registerTransaction says: "Creé el usuario."');
            return await magic(walletDir, email, amount, usdToArs, btcLast);
        }
    }
}

module.exports = helpers;