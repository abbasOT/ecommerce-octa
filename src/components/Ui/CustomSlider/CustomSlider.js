"use client"
import { styled } from '@mui/system';
import { Slider } from '@mui/material'


export const CustomSlider = styled(Slider)(({ theme }) => ({
    color: '#2E838F',
    height: 4,

    '& .MuiSlider-thumb': {
        height: 12,
        width: 12,
        backgroundColor: 'black',
    },

    '& .MuiSlider-rail': {
        color: 'grey',
        opacity: 1,
        height: 4,
    },
}));
