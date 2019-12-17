const router = require('express').Router(),
Transaction = require('../models/transactionsBuy');

router.get('/validate-payment/:id', async(req, res) => {
    const { id } = req.params;
    const transaction = await Task.findById(id);
    transaction.finished = !transaction.finished;               // Actualizo el estado
    await transaction.save();                                   // Guardo el objeto
    res.render('validation/payment', {id});
});

module.exports = router;