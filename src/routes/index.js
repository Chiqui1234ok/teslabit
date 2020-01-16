const router = require('express').Router();
const nodeMailer = require('nodemailer');

router.get('/', (req, res) => {
    res.render('index', req.session.passport);
});

router.post('/send-email', (req, res) => {
    const { email, subject, message } = req.body;
    res.render('contact/email-sended', {email, subject, message});
});

router.get('/test', (req, res) => {
    res.render('test/index');
});

router.post('/test', async (req, res) => {
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
    transporter.sendMail(data, (err, res) => {
        if(err)
            req.flash('Ha sido imposible enviarte el email. Prueba luego.');
        else
            req.flash('¡Hemos enviado el email!');

        console.log('res.message:', res.message);
    });
});

module.exports = router;