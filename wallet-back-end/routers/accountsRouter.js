const express = require('express');
const accounts = require('../modules/accounts');
const accountsRouter = express.Router();

accountsRouter.get('/addresses', (req, res) => {
    console.log('router GET account details called');
    res.status(200).json(accounts.getAddresses());
});

accountsRouter.get('/balance', (req, res) => {
    console.log('router GET:account/balance called:');
    res.status(200).send(accounts.getBalance(req.query.accountAddress));
});

//route to call update balance from the UI
accountsRouter.get('/updateBalance', (req, res) => {
    console.log('router GET:account/updateBalance called:');
    accounts.updateBalance(req.query.amount);
});


module.exports = accountsRouter;