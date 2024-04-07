const mongoose = require('mongoose');
const { Transaction } = require('../models/transactionModel');
const { SHA256 } = require('../node_modules/crypto-js');

let connectionString = "mongodb://0.0.0.0:27017/blockchain-explorer-assignment";
mongoose.connect(connectionString);

//connection to mongoose
mongoose
  .connect(connectionString, { useNewUrlParser: true } )
  .then( () => { console.log("Mongoose connected successfully to Mongo DB"); },
    error => { console.log("Mongoose could not connected to database: " + error); }
  );

async function getTransactionHistory() {
    const transactionHistory = await Transaction.find({});
    console.log('getTransactionHistory module called:');
    return transactionHistory;
}

async function sendTransaction(source, destination, value, blockNumber) {
    console.log('sendTransaction module called:');   

    try {
        //create a new transaction 
        const newTransaction = new Transaction({
            source: source,
            destination: destination,
            amount: value,
            blockNumber: blockNumber+1,
            status: "SUCCESS",
            gasUsed: 25000,
            receiptHash: String("0x"+SHA256(source)),
            blockHash: String("0x"+SHA256(destination)),
            creationTime: (new Date()).toString(),
        });

        //save the transaction to the database using async/await
        await newTransaction.save();
        //stores receipt object 
        const receipt = newTransaction;
        console.log('New transaction saved successfully');
        console.log(receipt);
        return receipt;
    } catch (error) {
        console.error('Error saving transaction:', error);
    }  
}

module.exports = {
    getTransactionHistory,
    sendTransaction,
};


//insert initial transaction data
Transaction.insertMany([
    {
        source: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        destination: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        amount: 15,
        blockNumber: 1,
        status: "SUCCESS",
        gasUsed: 25000,
        receiptHash: String(SHA256("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")),
        blockHash: String(SHA256("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")),
        creationTime: (new Date()).toString(),
    },
    {
        source: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        destination: '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097',
        amount: 25,
        blockNumber: 2,
        status: "SUCCESS",
        gasUsed: 25000,
        receiptHash: String(SHA256("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")),
        blockHash: String(SHA256("0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097")),
        creationTime: (new Date()).toString(),
    },
    {
        source: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        destination: '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E',
        amount: 335,
        blockNumber: 3,
        status: "SUCCESS",
        gasUsed: 25000,
        receiptHash: String(SHA256("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")),
        blockHash: String(SHA256("0xbDA5747bFD65F08deb54cb465eB87D40e51B197E")),
        creationTime: (new Date()).toString(),
    }
]).then(function(){
    console.log("Initial transaction data inserted")  // Success
}).catch(function(error){
    console.log(`Error loading transaction data`, error)      // Failure
});