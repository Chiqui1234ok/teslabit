$(document).ready(function() {
    // Inicialización de valores
    let data = {
        commission: 1.05, // Comisión de Teslabit del 5%
        minAmount: $('#cryptocurrencyMin').val(), // Mínimo que el usuario puede comprar
        cryptocurrencyPrice: $('#cryptocurrencyPrice'), // Precio de la criptomoneda al momento de cargar la página
        cryptocurrencyName: $('#cryptocurrencyName'), // Nombre de la criptomoneda
        usd: $('#usdToArs'), // Dólar blue venta hoy
        usdAux: $('#usdToArs').val() // <igual a var 'usd'> -> si le cotización se da en AR$, 1 -> si la cotización es en U$D
    };
    let inversion = (data.minAmount * data.cryptocurrencyPrice.val()*data.usd.val())*data.commission;
    let userFrontEnd = {
        cryptoQuantity: $('#cryptocurrencyQuantity'), // div de criptomonedas a comprar
        moneyQuantity: $('#moneyQuantity') // div de dinero (equivalente a la cant. de crypto)
    };
    // Inicialización del mínimo
    userFrontEnd.cryptoQuantity.val(data.minAmount);
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
    let step = 0, record = 0;
    let stepCode = '#step'+(step+1);
    function wizardController() {
        stepCode = '#step'+(step+1);
        console.log(stepCode);
        for(let i = 0;i < wizard.length;i++)
            wizard[i].css('display', 'none');
        wizard[step].css('display', 'grid');
        
        $(stepCode).addClass('active');
        if(step == 0)
            $('#usdSwitcher').css('display', 'block');
        else 
            $('#usdSwitcher').css('display', 'none');
    }

    function checkWallet(wallet, cryptocurrency) {
        let valid = WAValidator.validate(wallet, cryptocurrency);
        //console.log('The wallet is '+valid);
        return valid;
    }

    function priceChecker() {
        let cryptoAmount = ( userFrontEnd.cryptoQuantity.val() >= data.minAmount );
        // let moneyAmount = ( userFrontEnd.moneyQuantity.val() >= (((data.minAmount*data.cryptocurrencyPrice.val())*data.usd.val())*1.05).toFixed(3) );
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
                .toFixed(7);
    }
    function moneyQuantity_calc() {
        return (((userFrontEnd.cryptoQuantity.val() * data.cryptocurrencyPrice.val())
                *data.usd.val())
                *1.05)
                .toFixed(2);
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
        record++;
        console.info('Step Value:', step);
    });
    $('#nextBtn2').click(function() {
        step++;
        record++;
        // Cargo el paso 3 (resúmen de la operación)
        $('#t_amountToBuy').text( userFrontEnd.cryptoQuantity.val() );
        $('#t_money').text( userFrontEnd.moneyQuantity.val() );
        $('#t_walletDir').html('<a href="https://www.blockchain.com/btc/address/'+$('#walletDir').val()+'">'+$('#walletDir').val()+'</a>' );
        console.info('Step Value:', step);
    });
    $('#usdSwitcher').click(function() {
        if( data.usd.val() == parseInt('1') ) {
            $('#currency1').text('U$D');
            $('#currency2').text('AR$');
            $('#currencyImg').attr('src', 'img/crypto/arg.jpg');
            data.usd.val(data.usdAux);
        } else {
            $('#currency1').text('AR$');
            $('#currency2').text('U$D');
            $('#currencyImg').attr('src', 'img/crypto/us.jpg');
            data.usd.val(1);
        }

        userFrontEnd.moneyQuantity.val( moneyQuantity_calc() ); // Recalculo la plata luego del cambio de divisa
        userFrontEnd.cryptoQuantity.val( cryptoQuantity_calc() );
        $('#amountToBuy').val( cryptoQuantity_calc() );
        $('#money').val( moneyQuantity_calc() );
        console.log(data.usd.val());
    });
    $('#restarter').click(function() {
        $(stepCode).removeClass('active');
        step--;
    });
    $('#backBtn2').click(function() {
        $(stepCode).removeClass('active');
        step--;
    });

    // function update()
    setInterval(function update(){
        wizardController();
        if( checkWallet($('#walletDir').val(), data.cryptocurrencyName.val()) ) // Eventos :: Chequeo de wallet
            $('#nextBtn2').prop('disabled', false);
    }, 750); // Update()
});