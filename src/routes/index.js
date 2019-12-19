const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', req.session.passport);
});

module.exports = router;