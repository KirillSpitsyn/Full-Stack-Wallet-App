import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from "axios";

function AddressesList () {
    const [nodeAddresses, setNodeAddresses] = useState([]);
    const [sourceAddress, setSourceAddress] = useState('');

    //fetch list of destination addresses and source address
    useEffect(() => {
        axios.get("http://localhost:5000/account/addresses")
          .then((response) =>{
            setNodeAddresses(response.data.addressesList);
            setSourceAddress(response.data.sourceETHAddress);
          });                            
      },[]);

    //helps to handle link click and update page 
    const handleClick = (location) => {
        window.location.href = location;
      };
      
    return(
        <div>
            <div class="d-flex justify-content-center">
                <Card border="dark" bg="secondary" text="light" style={{ width: '30rem' }}>
                    <Card.Header><h5>Your ETH address: </h5></Card.Header>
                <Card.Body>
                    <b>{sourceAddress}</b>
                </Card.Body>
                </Card>   
            </div>
            <br/>
            <div class="d-flex justify-content-center">
                <Card border="dark" bg="dark" text="light" style={{ width: '30rem' }}>
                    <Card.Header> <h5>Choose Address to which your ETH will be sent: </h5></Card.Header>
                <Card.Body>
                {/*mapping that goes over all addresses in the list and allows to choose address to send ETH,
                addresses come from the GET request to account/addresses*/}
                {nodeAddresses.map((address, index) =>(
                    <div key={index}>
                        <Router>
                            <Link to="/transfer/:nodeAddress" onClick={() => handleClick('/transfer/'+address)}>
                                <b>{address}</b>
                            </Link>
                        </Router>
                    </div>
                ))}
                </Card.Body>
                </Card>   
            </div>
        </div>
    );
}

export default AddressesList;