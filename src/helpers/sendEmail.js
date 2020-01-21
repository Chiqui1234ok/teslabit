const helpers = {};
const nodeMailer = require('nodemailer');
// Envía un email cuándo el usuario compra bitcoin

helpers.sendEmail = async function(email) {
    let transporter = nodeMailer.createTransport({    
        host: 'mail.teslabit.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NO_REPLY_EMAIL_DIR || 'no-responder@teslabit.net',
            pass: 'lilolilo007'
        }
    });
    let data = {
        from: process.env.NO_REPLY_EMAIL_DIR || 'no-responder@teslabit.net',
        to: email.receiver,
        subject: email.subject || 'Email de TeslaBit',
        // body: message
        // text: message
        html: email.message /* tengo que poner el mensaje de bienvenida POR DEFECTO*/
    };
    await transporter.sendMail(data, (err, res) => {
        if(err)
            req.flash('Ha sido imposible enviarte el email. Prueba luego.');
        // else
        //     req.flash('¡Hemos enviado el email!');
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