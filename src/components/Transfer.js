import React, { useState } from "react";
import { ethers } from "ethers";
import { connectWallet, transferTokens } from "../Web3/interactions"; 

const Transfer = () => {
  const [userAddress, setUserAddress] = useState(null); 
  const [toAddress, setToAddress] = useState(""); 
  const [amount, setAmount] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); 

  

  const handleConnectWallet = async () => {
    const address = await connectWallet();
    if (address) {
      setUserAddress(address); 
    
    }
  };

  const handleTransfer = async () => {
    if (!userAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!toAddress || !amount) {
      alert("Please complete the information!");
      return;
    }

    if (!ethers.utils.isAddress(toAddress)) {
      alert("Invalid Ethereum address!");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid positive amount!");
      return;
    }

    setLoading(true);
    try {
     
      await transferTokens(toAddress, amount);
      setSuccessMessage("Transfer successfully completed!");
      setTimeout(() => {
        setSuccessMessage(""); 
      }, 3000);
      setToAddress(""); 
      setAmount(""); 
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed: " + error.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Token Transfer</h2>
      {userAddress ? (
        <div>
          
          <input
            type="text"
            placeholder="Recipient Address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleTransfer} disabled={loading}>
            {loading ? "Processing..." : "Submit Transfer"}
          </button>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
      ) : (
        <button onClick={handleConnectWallet}>ConnectABC Wallet</button>
      )}
    </div>
  );
};

export default Transfer;









