// components/LoadingSpinner.js

import React from 'react';
import { CircularProgress, Box } from '@mui/material'; // Assuming you're using MUI

const LoadingSpinner = () => (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress sx={{ color: 'var(--primary-color)' }} />
  </Box>
);

export default LoadingSpinner;
