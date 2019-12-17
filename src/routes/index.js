const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('index: ', req.session.passport);
    res.render('index', req.session.passport);
});

module.exports = router;