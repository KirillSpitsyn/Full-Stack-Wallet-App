import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Transfer from './components/Transfer';
import TransactionHistory from './components/TransactionHistory';
import Wallet from './components/Wallet';
import AddressesList from './components/AddressesList';

function App() {
  //allows to update page when Link in the menu is clicked
  const handleClick = (location) => {
    window.location.href = location;
  };

  return (
    <div className="App">
      {/*Navigation menu that uses react bootstrap nav bar and Link to from react router*/}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="m-auto">
          <Router>
            <Link to="/transaction" onClick={() => handleClick('/transaction')}><Nav.Link href="/transaction">Transaction History</Nav.Link></Link>
            <Link to="/addresses" onClick={() => handleClick('/addresses')}><Nav.Link href="/addresses">List of Addresses</Nav.Link></Link>
            <Link to="/wallet" onClick={() => handleClick('/wallet')}><Nav.Link href="/wallet">My Wallet</Nav.Link></Link>
          </Router>
          </Nav>
        </Container>
      </Navbar>
      <br/>
      {/*Navigation routes*/}
      <Router>
        <Switch>
          <Route path="/transaction"><TransactionHistory/></Route>
          <Route path="/transfer/:nodeAddress"><Transfer/></Route>
          <Route path="/addresses"><AddressesList/></Route>
          <Route path="/wallet"><Wallet/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
