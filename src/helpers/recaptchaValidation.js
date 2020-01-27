const helpers = {};
const fetch = require('node-fetch');

helpers.recaptchaValidation = async (req, res, next) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LfqUc4UAAAAAOCgh92z1mPmrleHIDMIluKAI-ca';
    const { token } = req.body;
    await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {method: 'GET'})
    .then(res => res.json())
    .then(( gresponse ) => {
        console.log(gresponse);
        if(gresponse.success)
            next();
        else {
            req.flash('error_msg', 'Imposible conectarse con Google Re-Captcha');
            res.redirect('/');
        }
    });
    // .catch(
    //     req.flash('error_msg', 'Imposible conectarse con Google Recaptcha.')
    // );
};

module.exports = helpers;
