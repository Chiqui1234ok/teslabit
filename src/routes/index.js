const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', req.session.passport);
});

router.post('/send-email', (req, res) => {
    const { email, subject, message } = req.body;
    res.render('contact/email-sended', {email, subject, message});
});

module.exports = router;