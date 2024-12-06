import React from "react";

const Balance = ({ balance }) => {
  return (
    <div>
      <h2>Balance of Token</h2>
      <p>{balance} Tokens</p>
    </div>
  );
};

export default Balance;