// https://www.npmjs.com/package/wallet-address-validator
  
// Inicialización
const cryptoQ = $('#cryptocurrencyQuantity'); // Input de calculator.hbs
const moneyQ = $('#moneyQuantity'); // Input de calculator.hbs
const min = {{cryptocurrency.min}}, last = {{data.last}};
// cryptoQ.val();
moneyQ.val(min*last);

