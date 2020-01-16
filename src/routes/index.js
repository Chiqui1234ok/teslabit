const router = require('express').Router();
const nodeMailer = require('nodemailer');
const { sendEmail } = require('../helpers/sendEmail');

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

router.post('/test', sendEmail, async (req, res) => {
    res.send('ok');
});

module.exports = router;