import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from "axios";

function Wallet () {
    const [balance, setBalance] = useState(0);
    const [sourceAddress, setSourceAddress] = useState('');

    //fetch firstly source account addresss, and then get 
    //balance using this address from SetSourceAddress function
    useEffect(() => {
        axios.get("http://localhost:5000/account/addresses")
        .then((response) =>{
          setSourceAddress(response.data.sourceETHAddress);
        });                           
    },[]);

    useEffect(() => {
        if (sourceAddress) {
            axios.get(`http://localhost:5000/account/balance?accountAddress=${sourceAddress}`)
                .then((response) =>{
                    setBalance(response.data.balance);
            });    
        }
    }, [sourceAddress]);
    

    return(
        <div class="d-flex justify-content-center">
            <Card border="dark" bg="secondary" text="light" style={{ width: '30rem' }}>
                <Card.Header><h1>My Wallet</h1></Card.Header>
            <Card.Body>
                <b>Address:</b> {sourceAddress}
                <br/>
                <b>Balance(ETH):</b> {balance}
            </Card.Body>
            </Card>   
        </div>
    );
}

export default Wallet;