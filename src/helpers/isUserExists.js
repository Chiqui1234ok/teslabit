const helpers = {};
const User = require('../models/users'),
Transaction = require('../models/transactionsBuy');

// Si el usuario existe, next() y gestiono el tema desde routes (hago una doble consulta de lo mismo, corregir)
// Si el usuario no existe, redirect('/user/sign-up')
// Si el usuario no existe, intenta crearlo. Si hubo una transacción, la registra en dicho usuario

helpers.isUserExists = async (req, res, next) => { // middleware
    const errors = [];
    const { email, password, password2 } = req.body;
    const user = await User.findOne({email: email});
    if(user) {
        const match = await user.matchPassword(password);
        if(match) {
            next();
        } else {
            req.flash('Este usuario existe pero la contraseña no concuerda');
            res.redirect('/user/sign-in');
            //next();
        }
    } else {
        const {amount, walletDir} = req.body;
        console.log(amount, walletDir);
        //
        const newUser = new User({email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        //
        
        if(amount && walletDir) {
            let lastPrice = 0;
            await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'Get'})
            .then(res => res.json())
            .then((data) => {
                lastPrice = (data.last*1.05).toFixed(2);
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
            req.flash('Hemos creado un usuario nuevo con tu transacción.');
            res.redirect('/user/sign-in');
        }
        req.flash('Este usuario no existe, registrate.');
        res.redirect('/user/sign-up');
    }
}    
module.exports = helpers;