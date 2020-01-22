const helpers = {};
const nodeMailer = require('nodemailer');
// Envía un email cuándo el usuario compra bitcoin

helpers.sendEmail = async function(receiver, subject, message) {
    let transporter = nodeMailer.createTransport({    
        host: process.env.EMAIL_SERVER_DIR || 'mail.teslabit.net',
        port: process.env.EMAIL_SERVER_PORT || 465,
        secure: true,
        auth: {
            user: process.env.NO_REPLY_EMAIL_DIR || 'no-responder@teslabit.net',
            pass: process.env.NO_REPLY_EMAIL_PASS || 'lilolilo007'
        }
    });
    let data = {
        from: process.env.NO_REPLY_EMAIL_DIR || 'no-responder@teslabit.net',
        to: receiver,
        subject: subject || 'Email de TeslaBit',
        // body: message
        // text: message
        html: message || '<p>¡Bienvenido a Teslabit! Tu cuenta ya se encuentra activada.</p><p>Recuerda que para operar, debes enviarnos el frente y reverso de tu DNI a <a href="mailto:administracion@teslabit.net">administracion@teslabit.net</a>.</p><p>¡Disfruta de nuestro exchange!</p>'
    };
    await transporter.sendMail(data, (err, res) => {
        if(err)
            console.warn('La cuenta', receiver, 'no ha recibido su email. Asunto:', subject);
    });
}

module.exports = helpers;

// helpers.sendEmail = async (req, res, next) => {
//     const { email, subject, message } = req.body;
//     let transporter = nodeMailer.createTransport({    
//         host: 'mail.teslabit.net',
//         port: 465,
//         secure: true,
//         auth: {
//             user: process.env.NO_REPLY_EMAIL_DIR || 'no-responder@teslabit.net',
//             pass: 'lilolilo007'
//         }
//     });
//     let data = {
//         from: process.env.NO_REPLY_EMAIL_DIR || 'no-responder@teslabit.net',
//         to: email,
//         subject: subject || 'Email de TeslaBit',
//         // body: message
//         // text: message
//         html: message
//     };
//     await transporter.sendMail(data, (err, res) => {
//         if(err)
//             req.flash('Ha sido imposible enviarte el email. Prueba luego.');
//         // else
//         //     req.flash('¡Hemos enviado el email!');
//     });
//     next();
// }