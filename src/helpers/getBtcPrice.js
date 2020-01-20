const helpers = {};

helpers.getBtcPrice = async function() {
    await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd', {method: 'GET'})
    .then(res => res.json())
    .then((data) => {
        return data.last;
    })
    .catch(function() {
        return 0; // Este valor tiene que ser manejado desde el script que llama a getBtcPrice()
    });
}

module.exports = helpers;