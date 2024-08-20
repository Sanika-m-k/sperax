import React, { useState, useEffect } from 'react';

const WalletBalance = ({ web3, account }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceEth);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    getBalance();
  }, [web3, account]);

  return (
    <div>
      <h2>Wallet Balance</h2>
      {balance !== null ? (
        <p>Balance: {balance} ETH</p>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
};

export default WalletBalance;
