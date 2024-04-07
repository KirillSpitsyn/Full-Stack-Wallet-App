import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function TransactionHistory() {
    const [transactionsHistory, setTransactionsHistory] = useState([]);
    let count=1;

    //fetch list of transactions
    useEffect(() => {
        axios.get("http://localhost:5000/transaction/history")
          .then((response) =>{
            setTransactionsHistory(response.data);
          });                            
      },[]);

    return(
        <div> 
            <h2>Transaction History</h2>
            {/*mapping that goes over all transactions in the list of transactions from App.js and shows each transaction*/}
            {transactionsHistory ? transactionsHistory.map((transactions) =>(
                <div class="d-flex justify-content-center">
                    <Card border="dark" bg="secondary" text="light" style={{ width: '40rem',  marginBottom: '20px' }}>
                    <Card.Header><h3>Transaction #{count++}</h3></Card.Header>
                    <Card.Body>
                        <h5>Transaction Hash:</h5> {transactions.receiptHash}
                        <h5>Block Hash: </h5> {transactions.blockHash}
                        <h5>Block Number: </h5> {transactions.blockNumber}
                        <h5>Status:</h5> {transactions.status}
                        <h5>Creation Time:</h5> {transactions.createdAt}
                        <h5>From:</h5> {transactions.source}
                        <h5>To:</h5> {transactions.destination}
                        <h5>Transaction Amount:</h5> {transactions.amount}
                        <h5>Gas Used:</h5> {transactions.gasUsed}
                    </Card.Body>
                    </Card>
                </div>
            )) 
            : null}  
        </div>
    );
}

export default TransactionHistory;