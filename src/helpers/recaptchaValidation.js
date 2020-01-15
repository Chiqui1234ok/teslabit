const helpers = {};

helpers.recaptchaValidation = async (err, req, res, next) => {
    let secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LfqUc4UAAAAAOCgh92z1mPmrleHIDMIluKAI-ca';
    let { token } = req.body;
    if(secretKey && token) {
        await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {method: 'POST'})
        .then(result => result.json())
        .then(gresponse => res.json({ gresponse }))
        .catch(err => res.json({ err }));
        if(res)
            next();
        else {
            req.flash('error', 'Hubo un error. ' + err);
            res.redirect('/');
        }
    } else {
        req.flash('error', 'No has superado el captcha anti-robots');       
        res.redirect('/');
    }
};

module.exports = helpers;
