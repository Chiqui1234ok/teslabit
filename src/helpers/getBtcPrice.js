const fetch = require('node-fetch');
const helpers = {};

helpers.getBtcPrice = async function() {
    let value;
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'GET'})
    .then(res => res.json())
    .then((data) => {
        value = data.last;
    });
    // .catch(console.warn('No se pudo obtener el valor del BTC.'));
    return isNaN(value) ? 0 : value;
}

module.exports = helpers;