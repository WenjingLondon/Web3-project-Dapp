
import { ethers } from "ethers";

const contractAddress = "0x8af7d1d8c3a31bf31fc47c9a2977be5e8d1fe29d";  // Contract address
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "claimant",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FaucetClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "faucet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hasClaimed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let provider;
let contract;

export const connectWallet = async () => {
  
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    return accounts[0]; 
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    alert("Failed to connect wallet.");
    return null;
  }
};

export const claimFaucet = async () => {
    try {
      const tx = await contract.faucet();
      await tx.wait(); 
      console.log("Faucet claim successful");
    } catch (error) {
      console.error("Error claiming faucet:", error);
    }
  };

export const transferTokens = async (toAddress, amount) => {
  if (!contract) {
    alert("Please connect wallet!");
    return;
  }
  
  try {
    const decimals = await contract.decimals();
    const formattedAmount = ethers.utils.parseUnits(amount, decimals);
    const tx = await contract.transfer(toAddress, formattedAmount);
  
    await tx.wait();
    alert("Transaction successful!");
    return tx; 
  } catch (error) {
    console.error("Error transferring tokens:", error);
    alert("Error transferring tokens.");
  }
};




