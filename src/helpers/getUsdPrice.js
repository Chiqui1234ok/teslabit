const helpers = {};

helpers.getUsdPrice = async function() {
    await fetch('https://argentina-hoy.herokuapp.com/devs/dolar-hoy', {method: 'GET'})
    .then(res => res.json())
    .then((data) => {
        return data.sell.official*1.3; // impuesto de 30%
    })
    .catch(function() {
        return 81.9; // A diferencia de getBtcPrice(), devuelvo $81,9 en caso de error porque el precio del dólar oficial/turista es relativamente estable
    });
}

module.exports = helpers;