import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const TokenBalance = ({ account }) => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [network, setNetwork] = useState('');

  // Replace these with test network token addresses and ABIs
  const tokenList = [
    { symbol: 'mytoken', address: '0xbc4cd50bcb7b46023fd40Db7dBBc1B1D290aA392', decimals: 18 },
    { symbol: 'TestToken2', address: '0x3997508200C21924c91e1C723A69816324f7B8b4', decimals: 18 },
    // Add more tokens as needed
  ];

  const ERC20_ABI = [
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function',
    },
  ];

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const web3 = new Web3(window.ethereum);

        // Ensure web3 is initialized correctly
        if (!web3 || !web3.eth) {
          console.error('web3 is not initialized properly');
          return;
        }

        const networkId = await web3.eth.net.getId();
        const networkName = await web3.eth.net.getNetworkType();
        setNetwork(networkName);
        console.log("networkName",networkName)

        const tokenBalances = await Promise.all(
          tokenList.map(async (token) => {
            const contract = new web3.eth.Contract(ERC20_ABI, token.address);
            const balance = await contract.methods.balanceOf(account).call();
            return {
              symbol: token.symbol,
              balance: balance / 10 ** token.decimals,
            };
          })
        );

        setBalances(tokenBalances);
      } catch (error) {
        console.error('Error fetching token balances:', error);
      } finally {
        setLoading(false);
      }
    };

    if (account) {
      fetchBalances();
    }
  }, [account]);

  return (
    <div>
      <h3>Token Balances on {network}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : balances.length > 0 ? (
        <ul>
          {balances.map((token) => (
            <li key={token.symbol}>
              {token.symbol}: {token.balance}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tokens found.</p>
      )}
    </div>
  );
};

export default TokenBalance;
