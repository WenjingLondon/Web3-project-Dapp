import './App.css';
import React, { useState } from "react";
import { connectWallet, claimFaucet } from "./Web3/interactions";  
import Transfer from "./components/Transfer";

function App() {
  const [userAddress, setUserAddress] = useState(null);  
  const [status, setStatus] = useState("");  


  const handleClaimFaucet = async () => {
    try {
      setStatus("Claiming tokens...");
      await claimFaucet();  
      setStatus("Faucet token received successfully!");
      
      setTimeout(() => {
        setStatus("");  
      }, 3000);
    } catch (error) {
      console.error("Error claiming faucet:", error);
      setStatus("Claiming faucet failed!");
    }
  };


  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);  
        console.log("Connected Address:", accounts[0]);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };
  
  

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.svg`}
          alt="Token Logo"
          className="Token-logo"
        />
        <h1>Token Maurice 'MAT' Transfer DApp</h1>
        {!userAddress ? (
          <button className="App-button" onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div className="App-content">
            <p>Account: {userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : "Not Connected"}</p>

            <Transfer userAddress={userAddress} />

            <div className="Faucet-container">
              <h2 className="Token-faucet-title">Token Faucet</h2>
              <button className="Faucet-button" onClick={handleClaimFaucet}>Claim Faucet</button>
              <p className="Status-message">{status}</p> 
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;





