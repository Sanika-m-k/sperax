import React, { useState } from 'react';

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }],
    name: 'transfer',
    outputs: [{ name: 'success', type: 'bool' }],
    type: 'function',
  },
];

const TokenAllowance = ({ web3, tokenAddress, account }) => {
  const [spender, setSpender] = useState('');
  const [allowance, setAllowance] = useState('');

  const checkAllowance = async () => {
    const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    const result = await contract.methods.allowance(account, spender).call();
    setAllowance(web3.utils.fromWei(result, 'ether'));
  };

  const containerStyle = {
    backgroundColor: '#080f26', // Dark blue background
    borderRadius: '10px',
    textAlign: 'center',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto', // Center the container
    color: 'white',
  };

  const h3Style = {
    color: 'white',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2>Token Allowance</h2>
      <h4 style={h3Style}>Not Completed this part</h4>
    </div>
  );
};

export default TokenAllowance;
