import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import TokenWatchList from './components/TokenWatchList';
import TokenAllowance from './components/TokenAllowance';
import TokenTransfer from './components/TokenTransfer';
import './App.css'; // Import the CSS file
import WalletBalance from './components/WalletBalance';
function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');

  const handleConnect = (web3Instance, userAccount) => {
    setWeb3(web3Instance);
    setAccount(userAccount);
  };

  return (
    <div className="App">
      <div className="container">
        <WalletConnect onConnect={handleConnect} />
        {web3 && account && (
          <>
            <div className="card">
              <TokenWatchList walletAddress={account} />
              <WalletBalance web3={web3} account={account} />
            </div>
            <div className="card">
              <TokenAllowance web3={web3} account={account} tokenAddress="0x3997508200C21924c91e1C723A69816324f7B8b4" />
            </div>
            <div className="card">
              <TokenTransfer web3={web3} account={account} tokenAddress="0x3997508200C21924c91e1C723A69816324f7B8b4" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
