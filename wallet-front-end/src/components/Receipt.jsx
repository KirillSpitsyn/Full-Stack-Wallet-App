import React from 'react';
import Card from 'react-bootstrap/Card';

function Receipt(props) {
    const {
        sourceAccount,
        destinationAccount,
        transactionAmount,
        transactionHash,
        blockHash,
        blockNumber,
        gasUsed,
        status,
        createdAt     
    } = props.receiptData;

    return (
        <div>
            <Card border="dark" bg="secondary" text="light" style={{ width: '50rem' }}>
                <Card.Header><h1>Receipt</h1></Card.Header>
            <Card.Body>
                <h5>Transaction Amount (ETH):</h5> {transactionAmount}
                <h5>Transaction Hash:</h5> {transactionHash}
                <h5>Block Hash:</h5> {blockHash}
                <h5>Block Number:</h5> {blockNumber}
                <h5>From:</h5> {sourceAccount}
                <h5>To:</h5> {destinationAccount}
                <h5>Gas Used:</h5> {gasUsed}
                <h5>Status:</h5> {status}
                <h5>Creation Time:</h5> {createdAt}
            </Card.Body>
            </Card>
        </div>
    );
}

export default Receipt;