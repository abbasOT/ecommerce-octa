"use client"

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CounterContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100px',
  height: '50px',
  justifyContent: 'space-between',
  padding: '0 5px',
  backgroundColor: '#f9f9f9',
});

const CounterButton = styled(Button)({
  minWidth: '20px',
  padding: '5px',
  fontSize: '14px',
});

const CounterValue = styled(Typography)({
  fontSize: '16px',
});

const CountButton = () => {
  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <CounterContainer>
      <CounterButton onClick={handleDecrement}>
        -
      </CounterButton>
      <CounterValue>{count}</CounterValue>
      <CounterButton onClick={handleIncrement}>
        +
      </CounterButton>
    </CounterContainer>
  );
};

export default CountButton;
