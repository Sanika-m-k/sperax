import React, { useState } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "payable": false,
    "type": "function"
  }
];


const TokenWatchlist = ({ walletAddress }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');




  const addTokenToWatchlist = async () => {
    setErrorMessage('');
  
    // Validate the token address
    if (!Web3.utils.isAddress(tokenAddress)) {
      setErrorMessage('Invalid token address.');
      return;
    }
  
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const erc20 = new web3.eth.Contract(ERC20_ABI, tokenAddress);
  
        // Fetch balance and decimals
        const balanceValue = await erc20.methods.balanceOf(walletAddress).call();
        const decimals = await erc20.methods.decimals().call();
  
        // Convert balance to a human-readable format
        const balanceBigNumber = new BigNumber(balanceValue);
        const decimalsBigNumber = new BigNumber(10).pow(decimals);
        const formattedBalance = balanceBigNumber.div(decimalsBigNumber).toFixed(2);
  
        // Check if the token address already exists in the watchlist
        const tokenExists = watchlist.some(token => token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase());
  
        if (!tokenExists) {
          // Add token to watchlist if it doesn't exist
          setWatchlist([...watchlist, { tokenAddress, balance: formattedBalance }]);
        } else {
          setErrorMessage('Token is already in the watchlist.');
        }
      } else {
        setErrorMessage('MetaMask is not installed.');
      }
    } catch (error) {
      setErrorMessage('Failed to retrieve token balance.');
      console.error(error);
    }
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px',
    magrin:'10px',
    border: '1px solid #778DA9',
    borderRadius: '4px',
    backgroundColor: 'var(--input-background)',
    color: 'var(--input-text)',
    boxSizing: 'border-box',
  };
  const btn={
    display: 'flex',
    padding:'10px',
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

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };
  
  const thStyle = {
    border: '1px solid #778DA9',
    padding: '15px',
    backgroundColor: '#415A77',
    color: '#E0E1DD',
    textAlign: 'left',
  };
  
  const tdStyle = {
    border: '1px solid #778DA9',
    padding: '15px',
    textAlign: 'left',
    backgroundColor: 'var(--input-background)',
    color: 'var(--text-color)',
  };
  

  return (
    <div>
      <h2>Token Watchlist</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="Enter token contract address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <div style={btn}>
      <button style={buttonStyle}
      onMouseOver={(e) => { e.target.style.backgroundColor = buttonHoverStyle.backgroundColor; }}
      onMouseOut={(e) => { e.target.style.backgroundColor = buttonStyle.backgroundColor; }}
      onClick={addTokenToWatchlist}>Add Token</button>
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <h3>Watchlist</h3>
      <table style={tableStyle}>
  <thead>
    <tr>
      <th style={thStyle}>#</th>
      <th style={thStyle}>Token Address</th>
      <th style={thStyle}>Balance</th>
    </tr>
  </thead>
  <tbody>
    {watchlist.map((token, index) => (
      <tr key={index}>
        <td style={tdStyle}>{index + 1}</td>
        <td style={tdStyle}>{token.tokenAddress}</td>
        <td style={tdStyle}>{token.balance}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default TokenWatchlist;
