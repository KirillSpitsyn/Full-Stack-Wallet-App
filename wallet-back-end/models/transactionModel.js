const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema to add transaction to database 
const transactionSchema = new Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    blockNumber: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    gasUsed: {
        type: Number,
        required:false
    },
    receiptHash: {
        type: String,
        required: false
    },
    blockHash: {
        type: String,
        required: false
    },
    creationTime: {
        type: Date,
        required: false
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    Transaction,
};