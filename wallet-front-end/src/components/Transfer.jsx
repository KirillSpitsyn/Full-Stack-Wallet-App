import React, { useState, useEffect } from 'react';
import Receipt from './Receipt';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

function Transfer() {
    const [amount, setAmount] = useState(0);
    const [blockNumber, setBlockNumber] = useState(0);
    const [showReceipt, setShowReceipt] = useState(false);
    const [sourceAddress, setSourceAddress] = useState('');
    const [receiptData, setReceiptData] = useState({});
    //destination address that we get from the url 
    let { nodeAddress } = useParams();

    //allows to update the Receipt data when the new transaction is added
    const updateReceiptData = (data) => {
        setReceiptData({
            sourceAccount: data.source,
            destinationAccount: data.destination,
            transactionAmount: data.amount,
            transactionHash: data.receiptHash,
            blockHash: data.blockHash,
            blockNumber: data.blockNumber,
            gasUsed: data.gasUsed,
            status: data.status,
            createdAt: data.createdAt,
        });
    };

    //fetch source address
    useEffect(() => {
        axios.get("http://localhost:5000/account/addresses")
          .then((response) =>{
            setSourceAddress(response.data.sourceETHAddress);
          });                            
      },[]);

    //allows to increase block number counter when the new transaction is added
    const addNewBlock = () => {
        setBlockNumber(prevCount => prevCount + 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        //checks that the transactions is valid based on amount
        if (amount === 0 || amount < 0) {
            return alert("Transaction Amount must be greater than 0!");
        }
        else { 
            try {
                addNewBlock();

                //update balance when new transaction is added
                axios.get(`http://localhost:5000/account/updateBalance?amount=${amount}`)
                .then(() =>{
                    console.log("Balance is updated");
                });                            

                //add new transaction to Mongo database 
                axios.post("http://localhost:5000/transaction/send",
                {
                source: sourceAddress,
                destination: nodeAddress,
                amount: amount,
                blockNumber: blockNumber,
                })
                .then(response => {
                    updateReceiptData(response.data)
                    setShowReceipt(true)
                })
            } catch (error) {
                console.error("Error adding new transaction", error);
            } 
        }
    };

    //allows to clear receipt information 
    const clearReceipt = () => {
        setShowReceipt(false);
    };

    return (
        <div>
            <br/>
            <div class="d-flex justify-content-center">
            <Card border="dark" bg="secondary" text="light" style={{ width: '25rem' }}>
            <Card.Header><h1>Transfer</h1></Card.Header>
            <Card.Body>
            <form>
                <h5>From: </h5>{sourceAddress}
                <br/>
                <h5>To: </h5>{nodeAddress}
                <br/>
                <h5>Amount (ETH):</h5>
                <input
                    type="number"
                    placeholder="Enter transaction amount"
                    value={amount}  
                    onChange={(event) => setAmount(event.target.value)}             
                />
                <br/><br/>
                <Button type="submit" onClick={(event) => handleSubmit(event)} variant="primary">Submit Transaction</Button> 
            </form>
            </Card.Body>
            </Card>
            </div> 
            <br/>
            {showReceipt ? 
            <> 
                <div class="d-flex justify-content-center">
                <Receipt receiptData={receiptData} />
                </div>
                <br/>
                <Button onClick={() => clearReceipt()} variant="primary">Clear Receipt</Button> 
            </> 
            : null}
        </div>
    );
}

export default Transfer;