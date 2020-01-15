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
            user: 'no-responder@teslabit.net',
            pass: 'lilolilo007'
        }
    });
    let recipient = {
        to: email,
        subject: subject,
        body: message
    };
    transporter.sendMail(recipient, (err, res) => {
        //req.flash(err);
        req.flash('Ha sido imposible enviarte el email. Prueba luego.')
        next();
    });
}

module.exports = helpers;