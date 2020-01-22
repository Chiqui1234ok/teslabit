const router = require('express').Router();
const nodeMailer = require('nodemailer');
const { sendEmail } = require('../helpers/sendEmail');

router.get('/', (req, res) => {
    res.render('index', req.session.passport);
});

router.post('/send-email', async (req, res) => {
    const { email, subject, message } = req.body;
    await sendEmail(email, subject, message);
    res.render('contact/email-sended', {email, subject, message});
});

module.exports = router;