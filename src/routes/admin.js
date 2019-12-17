const router = require('express').Router(),
Transaction = require('../models/transactionsBuy');

router.get('/admin/acceptPayment/:id', async(req, res) => {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    console.log(transaction);
    if(transaction)
        transaction.finished = !transaction.finished;
    
    await transaction.save();
    req.flash('success_msg', 'Estado actualizado');
    res.redirect('/user/profile');
});

module.exports = router;