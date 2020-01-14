const helpers = {};

helpers.recaptchaValidation = async (err, req, res, next) => {
    let secretKey = process.env.RECAPTCHA_SECRET_KEY;
    let token = req.body.recaptchaToken;
    console.log(secretKey, token);
    if(secretKey && token)
        await fetch('`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`', {method: 'POST'})
        .then(result => result.json())
        .then(gresponse => res.json({ gresponse }))
        .catch(err => res.json({ err }));
        if(err)
            req.flash('error_msg', err);
    else {
        req.flash('error_msg', 'No has superado el captcha anti-robots');       
    }
    next();
};

module.exports = helpers;
