const   helpers = {};
const   { getBtcPrice } = require('./getBtcPrice'),
        { getUsdPrice } = require('./getUsdPrice'),
        { registerUser } = require('./registerUser');

helpers.registerTransaction = async function(amount, walletDir, email) {
    const btcPrice = await getBtcPrice();
    const usdToArs = await getUsdPrice();
    if(btcPrice == 0) {
        req.flash('error_msg', 'Imposible obtener el precio del Bitcoin en estos momentos.');
        res.redirect('/');
    } else {
        const newUser = registerUser(); // devuelve TRUE si creó al usuario, o FALSE si ya existe
        if(newUser) {
            const newTransaction = new Transaction({
                email: email,
                cryptocurrency: {
                    name:       'bitcoin',
                    price:      lastBtcPrice
                },
                payTo: {
                    walletDir:  walletDir,        
                    amount:     amount,
                    totalInArs: (amount*btcPrice)*usdToArs,
                    totalInUsd: amount*btcPrice          
                },
                dollar: usdToArs
            });
            await newTransaction.save();
            return true;
        } else { // Si el usuario ya existía, creo la transacción sin más :)
            const newTransaction = new Transaction({
                email: email,
                cryptocurrency: {
                    name:       'bitcoin',
                    price:      lastBtcPrice
                },
                payTo: {
                    walletDir:  walletDir,        
                    amount:     amount,
                    totalInArs: (amount*btcPrice)*usdToArs,
                    totalInUsd: amount*btcPrice          
                },
                dollar: usdToArs
            });
            await newTransaction.save();
            return false; // Devuelve false si no tuvo que crear al usuario (se asume que la transacción se pudo crear)
        }
        
    }
}