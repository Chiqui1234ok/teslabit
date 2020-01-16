const helpers = {};
const nodeMailer = require('nodemailer');
// Envía un email cuándo el usuario compra bitcoin

helpers.sendEmail = async (req, res, next) => {
    const { email, subject, message } = req.body;
    let transporter = nodeMailer.createTransport({    
        host: 'mail.teslabit.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NO_REPLY_EMAIL || 'no-responder@teslabit.net',
            pass: 'lilolilo007'
        }
    });
    let data = {
        from: process.env.NO_REPLY_EMAIL || 'no-responder@teslabit.net',
        to: email,
        subject: subject,
        // body: message
        text: message
    };
    await transporter.sendMail(data, (err, res) => {
        if(err)
            req.flash('Ha sido imposible enviarte el email. Prueba luego.');
        // else
        //     req.flash('¡Hemos enviado el email!');
    });
    next();
}

module.exports = helpers;