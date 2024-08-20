import React, { useState } from 'react';
import Web3 from 'web3';
const ERC20_ABI= [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "keyword",
          "type": "string"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "keyword",
          "type": "string"
        }
      ],
      "name": "addToBlockchain",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "keyword",
              "type": "string"
            }
          ],
          "internalType": "struct Transactions.TransferStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },    
    {
      "inputs": [],
      "name": "getTransactionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  
  const TokenTransfer = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleTransfer = async (e) => {
      e.preventDefault();
      setError('');
      setTransactionHash('');
      setLoading(true);
  
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          const tokenAddress = '0x09f7B3B2C818fcE5D54f1426cbFfC61f10C85735'; // Replace with your token contract address
          const tokenABI = ERC20_ABI;
  
          const contract = new web3.eth.Contract(tokenABI, tokenAddress);
          const accounts = await web3.eth.getAccounts();
          const amountToSend = web3.utils.toWei(amount, 'ether');
  
          const receipt = await contract.methods
            .addToBlockchain(recipient, amountToSend, 'message', 'keyword')
            .send({ from: accounts[0], value: amountToSend });
  
          setTransactionHash(receipt.transactionHash);
        } else {
          setError('MetaMask not detected.');
        }
      } catch (err) {
        setError('Transaction failed: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const containerStyle = {
      padding: '20px',
      backgroundColor: 'var(--container-background)',
    };
  
    const h2Style = {
      color: 'var(--heading-color)',
    };
  
    const formStyle = {
      display: 'flex',
  flexDirection: 'column',

    };
  
    const inputs = {
      marginBottom: '10px',
    };
  
    const labelStyle = {
      display: 'block',
      marginBottom: '5px',
    };
  
    const inputStyle = {
      width: '100%',
      padding: '10px',
      border: '1px solid #778DA9',
      borderRadius: '4px',
      backgroundColor: 'var(--input-background)',
      color: 'var(--input-text)',
      boxSizing: 'border-box',
    };
    const btn={
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      textAlign: 'center',
    }
    const buttonStyle = {
      color:'#778DA9',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#415A77',
      color: 'var(--button-text)',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      width:'140px',
      display:'flex',
      justifyContent:'center'

    };
  
    const buttonHoverStyle = {
      backgroundColor: '#778DA9',
    };
  
    const buttonDisabledStyle = {
      backgroundColor: 'var(--button-disabled-background)',
      color: 'var(--button-disabled-text)',
      cursor: 'not-allowed',
    };
  
    const transactionInfoStyle = {
      backgroundColor: 'var(--transaction-background)',
      padding: '10px',
      borderRadius: '4px',
      marginTop: '20px',
    };
  
    const aStyle = {
      color: 'var(--link-color)',
      textDecoration: 'none',
    };
  
    const aHoverStyle = {
      textDecoration: 'var(--link-hover-text-decoration)',
    };
  
    const errorStyle = {
      color: 'var(--error-text)',
      marginTop: '10px',
    };
  
  
    return (
      <div style={containerStyle}>
        <h2 style={h2Style}>Transfer Tokens</h2>
        <form onSubmit={handleTransfer} style={formStyle}>
          <div >
          <div style={inputs}>
            <label style={labelStyle}>Recipient Address:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              required
              style={inputStyle}
            />
          </div>
          <div style={inputs}>
            <label style={labelStyle}>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
              style={inputStyle}
            />
          </div>
          </div>
          <div style={btn}>
          <button
            type="submit"
            disabled={loading}
            style={loading ? buttonDisabledStyle : buttonStyle}
            onMouseOver={(e) => { if (!loading) e.target.style.backgroundColor = buttonHoverStyle.backgroundColor; }}
            onMouseOut={(e) => { if (!loading) e.target.style.backgroundColor = buttonStyle.backgroundColor; }}
          >
            {loading ? 'Processing...' : 'Transfer'}
          </button>
          </div>
        </form>
  
        {transactionHash && (
          <div style={transactionInfoStyle}>
            <p>Transaction successful!</p>
            <p>
              Transaction Hash:{' '}
              <a
                href={`https://etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={aStyle}
                onMouseOver={(e) => e.target.style.textDecoration = aHoverStyle.textDecoration}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
              >
                {transactionHash}
              </a>
            </p>
          </div>
        )}
  
        {error && <p style={errorStyle}>{error}</p>}
      </div>
    );
  };
  
  export default TokenTransfer;