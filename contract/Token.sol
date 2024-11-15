
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; 

contract Token {
    string public name = "MauriceToken";
    string public symbol = "Mat";
    uint8 public decimals = 18;
    uint256 public totalSupply = 100000 * (10 ** uint256(decimals)); 

    mapping(address => uint256) public balanceOf; 

    event Transfer(address indexed from, address indexed to, uint256 value); 

    constructor() {
        balanceOf[msg.sender] = totalSupply; 
    }

    function transfer (address _to, uint256 _value) public returns (bool success) {
        require (balanceOf[msg.sender] >= _value, "Not sufficient balance"); 
        balanceOf[msg.sender] -= _value; 
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value); 
        return true;
        
    }
    }


