const fetch = require('node-fetch');
const helpers = {};

helpers.getUsdPrice = async function() { // no-optimized
    // let value;
    // await fetch('https://argentina-hoy.herokuapp.com/devs/dolar-hoy', {method: 'GET'})
    // .then(res => res.json())
    // .then((data) => {
    //     value = data.sell.official*1.3; // impuesto de 30%
    // });
    // // .catch(console.warn('No se pudo obtener el dólar hoy.'));
    // //return value;
    return 86;
}

module.exports = helpers;