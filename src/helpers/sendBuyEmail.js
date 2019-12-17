const helpers = {};
const nodeMailer = require('nodemailer');
// Envía un email cuándo el usuario compra bitcoin

helpers.sendBuyEmail = async (req, res, next) => {
    let transporter = nodeMailer.createTransport({    
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'santiagogimenez99@gmail.com',
            pass: 'lilolilo100'
        }
    });
    let recipient = {
        to: req.body.email,
        subject: 'Los datos de tu compra',
        // body: `<p>¡Hola ${email}! Aquí están los datos de tu compra realizada el ${Date.now}. <br>
        // Si en 30 minutos no se acredita tu pago, se vencerá el pedido de Bitcoins debido a la fluctuación del valor de dicha criptomoneda. Sin embargo, tu dinero quedará en la plataforma para que puedas volver a operar instantáneamente desde <a href="/but/bitcoin">aquí</a>.</p>
        // <p>Al depósitarnos, indica tu email o nombre completo en tus "notas de pago".<br />
        // Nuestros datos son los siguientes.</p>
        // <h2>Cuenta bancaria #1</h2>
        // <p>bip bup, ¿bap beep?</p>
        // <p>¡Los pagos vía Rapipago/Pagofácil/Link no tardarán en llegar!</p>`
        body: 'test'
    };
    transporter.sendMail(recipient, (err, res) => {
        req.flash(err);
        next();
    });
}

module.exports = helpers;