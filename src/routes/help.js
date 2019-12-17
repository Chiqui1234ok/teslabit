const router = require('express').Router();

router.get('/help', (req, res) => {
    res.render('help/index'); // próximamente "help"
});

router.get('/help/commission', (req, res) => {
    res.render('help/commission'); // próximamente "help"
});

router.get('/help/requirements', (req, res) => {
    res.render('help/requirements');
});

router.get('/help/terms-of-service', (req, res) => {
    res.render('help/terms-of-service'); // próximamente "help"
});

module.exports = router;