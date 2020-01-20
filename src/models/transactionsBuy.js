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
        amount:     {type: Number, required: true}          // Cantidad de criptomoneda comprada en una operación
    },
    dollar: { // Si el usuario compró en pesos, se debe mostrar el dólar de esa fecha y usar este valor para convertir a pesos el monto final
        type: Number,
        default: 81.9 // esto para que no explote, pero tengo que hacerlo compatible con mi routes.buy :)
    },
    date: {
        type:       Date,       // Fecha de compra
        default:    Date.now
    },
    finished: {                 // Se activa cuándo el administrador permite el pago al usuario comprador
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('transactionsBuy', TransactionsBuySch);