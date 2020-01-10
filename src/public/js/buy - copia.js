$(document).ready(function() {
    // Inicialización de valores
    let data = {
        commission: 1.05, // Comisión de Teslabit del 5%
        minAmount: $('#cryptocurrencyMin'), // Mínimo que el usuario puede comprar
        cryptocurrencyPrice: $('#cryptocurrencyPrice'), // Precio de la criptomoneda al momento de cargar la página
        cryptocurrencyName: $('#cryptocurrencyName'), // Nombre de la criptomoneda
        usd: $('#usdToArs'), // Dólar blue venta hoy
        usdAux: $('#usdToArs').val() // <igual a var 'usd'> -> si le cotización se da en AR$, 1 -> si la cotización es en U$D
    };
    let inversion = (data.minAmount.val() * data.cryptocurrencyPrice.val()*data.usd.val())*data.commission;
    let userFrontEnd = {
        cryptoQuantity: $('#cryptocurrencyQuantity'), // div de criptomonedas a comprar
        moneyQuantity: $('#moneyQuantity') // div de dinero (equivalente a la cant. de crypto)
    };
    // Inicialización del mínimo
    userFrontEnd.cryptoQuantity.val(data.minAmount.val());
    userFrontEnd.moneyQuantity.val(inversion.toFixed(2));

        // console.log
        console.log(`Precio BTC: ${data.cryptocurrencyPrice.val()}\nUSD: ${data.usd.val()}\nUSD Aux: ${data.usd.val()}`);

    // Inicialización de divs
    const wizard = [
        $('#main'),
        $('#wallet'),
        $('#finish')
    ];
    // Control de aparición de divs
    let step = 0;
    function wizardController() {
        for(let i = 0;i < wizard.length;i++)
            wizard[i].css('display', 'none');
        wizard[step].css('display', 'grid');
        $('#step'+step+1).addClass('active');
    }

    function checkWallet(wallet, cryptocurrency) {
        let valid = WAValidator.validate(wallet, cryptocurrency);
        console.log('The wallet is '+valid);
        return valid;
    }

    function priceChecker() {
        let cryptoAmount = ( userFrontEnd.cryptoQuantity.val() >= data.minAmount.val() );
        // let moneyAmount = ( userFrontEnd.moneyQuantity.val() >= (((data.minAmount.val()*data.cryptocurrencyPrice.val())*data.usd.val())*1.05).toFixed(3) );
        let moneyAmount = true;
        if( cryptoAmount && moneyAmount ) {
            $('#nextBtn1').prop('disabled', false);
            $('#success').css('display', 'block');
            $('#warn').css('display', 'none');
        } else {
            $('#nextBtn1').prop('disabled', true);
            $('#success').css('display', 'none');
            $('#warn').css('display', 'block');
        }
        console.log('CryptoQuantity:', userFrontEnd.cryptoQuantity.val());
        console.log('MoneyQuantity:', userFrontEnd.moneyQuantity.val());
        //return
    }

    function cryptoQuantity_calc() {
        return (((userFrontEnd.moneyQuantity.val() / data.usd.val()) 
                / data.cryptocurrencyPrice.val())
                / 1.05)
                .toFixed(5);
    }
    function moneyQuantity_calc() {
        return (((userFrontEnd.cryptoQuantity.val() * data.cryptocurrencyPrice.val())
                *data.usd.val())
                *1.05)
                .toFixed(3);
    }

    // Eventos :: Convertidor cripto
    userFrontEnd.moneyQuantity.keyup(function() {
        userFrontEnd.cryptoQuantity.val(
            cryptoQuantity_calc()
        );
        priceChecker();
    });

    userFrontEnd.cryptoQuantity.keyup(function() {
        userFrontEnd.moneyQuantity.val(
            moneyQuantity_calc()
        );
        priceChecker();
    });

    // Eventos :: Botones
    $('#nextBtn1').click(function() {
        step++;
        console.info('Step Value:', step);
    });
    $('#nextBtn2').click(function() {
        step++;
        console.info('Step Value:', step);
    });
    $('#usdSwitcher').click(function() {
        if( data.usd.val() == parseInt('1') ) {
            $('#currency').text('AR$');
            data.usd.val(76);
        } else {
            $('#currency').text('U$D');
            data.usd.val(1);
        }

        userFrontEnd.moneyQuantity.val( moneyQuantity_calc() ); // Recalculo la plata luego del cambio de divisa
        userFrontEnd.cryptoQuantity.val( cryptoQuantity_calc() );
        console.log(data.usd.val());
    });

    // Eventos :: Chequeo de wallet
    $('#walletDir').change(function() {
        if( checkWallet($('#walletDir').val(), data.cryptocurrencyName.val()) )
            $('#nextBtn2').prop('disabled', false);
    });
    // function update()
    setInterval(function update(){
        console.info('Calling "wizardController()"');
        wizardController();
    }, 1000); // Update()
});


// Magia
// cryptoQ.keyup(function () {
//     moneyQ.val( (((cryptoQ.val()*{{data.last}})*usdAux)*1.05).toFixed(2) );// 1.05 (5%) es la comisión de Teslabit
//     cryptoAmountHandler(); // Chequea que el monto introducido por el usuario cumpla con el mínimo de venta
// });

// moneyQ.keyup(function () {
//     cryptoQ.val( ((moneyQ.val()/usdAux)/{{data.last}}) );
//     cryptoAmountHandler(); // Chequea que el monto introducido por el usuario cumpla con el mínimo de venta
// });

// $('#walletDir').keyup(function () {
//     if( checkWallet($('#walletDir').val(), '{{cryptocurrency.name}}') )
//         $('#nextBtn2').prop('disabled', false);
//     else
//         $('#nextBtn2').prop('disabled', true); // Esto evita que si el usuario cambia algo luego de darle al botón "Validar wallet", pueda enviar una dirección errónea
// });

// $('#walletDir').change(function () { // HOTFIX
//     if( checkWallet($('#walletDir').val(), '{{cryptocurrency.name}}') )
//         $('#nextBtn2').prop('disabled', false);
//     else
//         $('#nextBtn2').prop('disabled', true); // Esto evita que si el usuario cambia algo luego de darle al botón "Validar wallet", pueda enviar una dirección errónea
// });

// function cryptoAmountHandler() {
//     if(cryptoQ.val() >= min || moneyQ.val() >= ((min*{{data.last}})*1.05).toFixed(2) ) {
//         successMsg.css('display', 'block');
//         warnMsg.css('display', 'none');
//         $('#nextBtn1').prop('disabled', false);
//     } else {
//         successMsg.css('display', 'none');
//         warnMsg.css('display', 'block');
//         $('#nextBtn1').prop('disabled', true);
//     }
//     console.log(cryptoQ.val(), moneyQ.val());
// }

// function step_showWallet() { // Hace cambios en los divs para mostrar el segundo paso
//     main.css('display', 'none');
//     wallet.css('display', 'grid');
//     finish.css('display', 'none');

//     $('#step1').removeClass('active');
//     $('#step2').addClass('active');
//     $('#step3').removeClass('active');
//     $('#usdSwitcher').css('display', 'none');
//     $('.wizard').removeClass('grid-2');
//     {{!-- $('#amountToBuy').text(`AR$${buy.totalArs} (U$D${buy.totalUsd})`); --}}
// }

// function step_showFinish() {
//     main.css('display', 'none');
//     wallet.css('display', 'none');
//     finish.css('display', 'block');
    
//     $('#step1').removeClass('active');
//     $('#step2').removeClass('active');
//     $('#step3').addClass('active');

//     // Recupera los datos de los campos para mostrarlos en la tabla
//     if(usdAux == 1)
//         $('#t_amountToBuy').text('U$D '+moneyQ.val());
//     else
//         $('#t_amountToBuy').text('AR$ '+moneyQ.val());
//     $('#t_walletDir').html(`<a href="https://www.blockchain.com/es/search?search=${$('#walletDir').val()}" title="Buscar este monedero en el blockchain">${$('#walletDir').val()}</a>`);
//     $('#t_cryptocurrency').text('{{cryptocurrency.name}}');
// }

// function restart() {
//     main.css('display', 'grid');
//     wallet.css('display', 'none');
//     finish.css('display', 'none');

//     $('#step1').addClass('active');
//     $('#step2').removeClass('active');
//     $('#step3').removeClass('active');
// }



// // Comienzo del programa
// cryptoAmountHandler();