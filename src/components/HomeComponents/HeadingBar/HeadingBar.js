"use client"

import React from 'react';
import { Box, } from '@mui/material';
import { HeadingBarStyles } from '@/components/Ui/Styles/Styles';

const HeadingBar = ({ leftValue, transformValue }) => {
    return (
        <Box sx={HeadingBarStyles.containerBox}>
            <Box sx={HeadingBarStyles.HeadingBarLine} >
                <Box sx={{ left: leftValue, transform: transformValue, ...HeadingBarStyles.HeadingBarSelectedLine, }}></Box>
            </Box>
        </Box>
    );
};
export default HeadingBar;
