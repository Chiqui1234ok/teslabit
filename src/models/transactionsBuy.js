const mongoose = require('mongoose');              //
const Schema = mongoose.Schema;
const TransactionsBuySch = new Schema({
    email:              {type: String, required: true},         // Actúa como identificador de usuario
    cryptocurrency: {
        name:       {type: String, required: true},
        price:      {type: Number, required: true}          // Valor de la criptomoneda en dicho momento
    },
    payTo: {
        walletDir:  {type: String, required: true},         // Cartera del usuario comprador
        amount:     {type: Number, required: true},         // Cantidad de criptomoneda comprada en una operación
        totalInArs: {type: Number, required: true},         // (amount*criptocurrency.price)*usdToArs
        totalInUsd: {type: Number, required: true}          // amount*criptocurrency.price
    },
    dollar: {type: Number, default: 81.9},                  // Si el usuario compró en pesos, se debe mostrar el dólar de esa fecha y usar este valor para convertir a pesos el monto final
    date: {type: Date, default: Date.now},                  // Fecha de compra
    finished: {type: Boolean, default: false}
});

module.exports = mongoose.model('transactionsBuy', TransactionsBuySch);