const   helpers = {};
const   Transaction = require('../models/transactionsBuy'),
        User = require('../models/users'),
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
            totalInArs: ((amount*btcLast)*usdToArs)*1.05,
            totalInUsd: (amount*btcLast)*1.05          
        },
        dollar: usdToArs
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
            
            return false;
        } else {
            await registerUser(email, password); // Si el usuario no existe, lo va a crear -> AGREGO 'AWAIT'
            // console.log('registerTransaction says: "Creé el usuario."');
            return await magic(walletDir, email, amount, usdToArs, btcLast);
        }
    }
}

module.exports = helpers;