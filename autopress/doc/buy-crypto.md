# Compra de criptomonedas
Este documento indica los campos de entrada y salida a la hora de comprar Bitcoins en Teslabit.

## Valores de la vista
#### Útiles para el modelo de la BD
* cryptocurrencyQuantity: es la cantidad de Bitcoins (cQ >= 0.05) que el usuario está comprando.
* moneyQuantity: es la cantidad de pesos que el usuario va a invertir, y se relaciona y retroalimenta con **cryptocurrencyQuantity**. De esta forma, si el usuario edita moneyQuantity, el valor de cryptocurrencyQuantity se modificará.
* walletDir: es la dirección de la cartera de Bitcoins del usuario comprador, dónde previa aprobación de los administradores, se depositará el monto en la cartera del usuario.
#### Útiles para la vista
Datos de la tabla que visualiza el resúmen de la operación al usuario, en el último paso de la página /buy/bitcoin
* t_amountToBuy: Muetra la cantidad de Bitcoins que se están por comprar.
* t_walletDir: Muestra la dirección de la cartera de Bitcoins del comprador.
* t_cryptocurrency: Muestra la criptomoneda que se está por comprar (por el momento, sólo Bitcoin)

## Valores del enrutador y modelo
Existe un objeto con las siguientes claves:

email:              String,         // Actúa como identificador de usuario
transactions: [
    {
        cryptocurrency: {
            name:       String,
            price:      Number      // Valor de la criptomoneda en dicho momento
        },
        amount:     Number,         // Cantidad de criptomoneda comprada en una operación
        walletDir:  String,         // Cartera del usuario comprador
        date: {
            type:       Date,       // Fecha de compra
            default:    Date.now
        },
        finished: {                 // Se activa cuándo el administrador permite el pago al usuario comprador
            type: Boolean,
            default: false
        }
    }
]
