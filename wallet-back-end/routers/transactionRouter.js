const express = require('express');
const transactionModule = require('../modules/transaction')
const transactionRouter = express.Router();
const bodyParser = require('body-parser'); 

transactionRouter.use(bodyParser.json());

transactionRouter.get('/history', async(req, res) => {
    const getHistory = await transactionModule.getTransactionHistory();
    console.log('router transaction history details called');
    res.status(200).send(getHistory);
});

transactionRouter.post('/send', async(req, res) => {
    const addTransactionToDb = await transactionModule.sendTransaction(req.body.source, req.body.destination, req.body.amount, req.body.blockNumber);
    console.log('router Post:transaction/send called');
    res.status(201).send(addTransactionToDb);
});

module.exports = transactionRouter;