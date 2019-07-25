import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import './App.css';


function App(context) {
  const [acctBalance, setAcctBalance] = useState("");
  const [acct, setAcct] = useState("");
  const [checkCurrentState, setCheckCurrentState] = useState("");
 
  const web3 = new Web3(Web3.givenProvider || "http://rinkeby.infura.io/v3/73da095d625a4359a8a8dd244beaf29c");

  const ABI = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "inputNum",
          "type": "uint256"
        }
      ],
      "name": "add",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCounter",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
  
  web3.eth.getAccounts().then(acct => {
    setAcct(acct)
    console.log("account: ", acct)
    // make sure strict type to string
    web3.eth.getBalance(acct.toString()).then(balance => setAcctBalance(balance/1000000000000000000))
  })

  // contract location
  var contractLocation = "0x1f035a0f8c796a2d78762f9f0aa304b666905d5c"

  // call contract location
  var contract1 = new web3.eth.Contract(ABI, contractLocation, {from: acct.toString(),  gasPrice: '20000000000'})

  // call get method and set to string
  contract1.methods.getCounter().call({from: acct.toString()}).then(value => {
    setCheckCurrentState(value)
  })

  return (
    <div className="App">
    <h3>Metamask Account: {acct}</h3>
    <h1> Balance: {acctBalance} ETH </h1>
    <h1> Current State: {checkCurrentState} </h1>
   
    </div>
  );
}

export default App;
