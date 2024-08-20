import React, { useState } from 'react';
import Web3 from 'web3';

const WalletConnect = ({ onConnect }) => {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        onConnect(web3, accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const btnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    textAlign: 'center',
  };

  const buttonStyle = {
    color: '#778DA9',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#415A77',
    color: 'var(--button-text)',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '200px',
    display: 'flex',
    justifyContent: 'center'
  };

  const buttonHoverStyle = {
    backgroundColor: '#778DA9',
  };

  const buttonDisabledStyle = {
    backgroundColor: 'var(--button-disabled-background)',
    color: 'var(--button-disabled-text)',
    cursor: 'not-allowed',
  };

  return (
    <div>
      <div style={btnStyle}>
        {!walletAddress ? (

          
          <button
            style={buttonStyle}
            onMouseOver={(e) => { e.target.style.backgroundColor = buttonHoverStyle.backgroundColor; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = buttonStyle.backgroundColor; }}
            onClick={connectWallet}
          >
            Connect Metamask
          </button>
          
        ) : (
          <>
          <h3>Connected Wallet</h3>
          <p>{walletAddress}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
