const helpers = {};

helpers.recaptchaValidation = async (err, req, res, next) => {
    let secretKey = process.env.RECAPTCHA_SECRET_KEY | '6LfqUc4UAAAAAOCgh92z1mPmrleHIDMIluKAI-ca';
    let { token } = req.body;
    let result, gresponse;
    console.log(secretKey, token);
    if(secretKey != '' && token != '') {
        await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {method: 'POST'})
        .then(result => result.json())
        .then(gresponse => res.json({ gresponse }))
        .catch(err => res.json({ err }));
        if(err) {
            req.flash('error', err);
            res.redirect('/');
        }
        console.log(result, gresponse);
        next();
    } else {
        req.flash('error', 'No has superado el captcha anti-robots');       
        res.redirect('/');
    }
    console.log('estoy fuera...', result, gresponse);
};

module.exports = helpers;
