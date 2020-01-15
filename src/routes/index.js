const router = require('express').Router(),
fetch = require('node-fetch');

router.get('/', (req, res) => {
    res.render('index', req.session.passport);
});

router.post('/send-email', (req, res) => {
    const { email, subject, message } = req.body;
    res.render('contact/email-sended', {email, subject, message});
});

router.post('/test', async (err, req, res) => {
    let secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LfqUc4UAAAAAOCgh92z1mPmrleHIDMIluKAI-ca';
    let { token } = req.body;
    console.log('secretKey:', secretKey, '\ntoken:', token);
    if(secretKey != '' && token != '') {
        await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {method: 'GET'})
        .then(result => result.json())
        .then(gresponse => res.json({ gresponse }))
        .catch(err => res.json({ err }));
        if(err) {
            req.flash('error', err);
            res.redirect('/');
        }
        res.send('RESPUESTA:' + res);
        // next();
    } else {
        req.flash('error', 'No has superado el captcha anti-robots');       
        res.redirect('/');
    }
});

module.exports = router;