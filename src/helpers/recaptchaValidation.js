const helpers = {};

helpers.recaptchaValidation = async (req, res, next) => {
    let secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LfqUc4UAAAAAOCgh92z1mPmrleHIDMIluKAI-ca';
    let { token } = req.body;
    await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {method: 'GET'})
    .then(res => res.json())
    .then(( gresponse ) => {
        next()
    })
    .catch(
        req.flash('error_msg', 'Imposible identificarte, intenta de nuevo.')
    );
};

module.exports = helpers;
