"use client"
import React, { useState } from 'react';
import { Box, Typography, Slider, Button, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesCardStyles, RegistrationStyles, ShopStyles } from '@/components/Ui/Styles/Styles';


export function FilterOption({ title, options, onChange, selectedOptions, }) {

    const [selected, setSelected] = useState(selectedOptions);

    const handleChange = (optionId) => {
        const updatedSelected = [...selected];
        const optionIndex = updatedSelected.indexOf(optionId);
        if (optionIndex === -1) {
            updatedSelected.push(optionId);
        } else {
            updatedSelected.splice(optionIndex, 1);
        }
        setSelected(updatedSelected);
        onChange(updatedSelected);
    };


    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ ...CategoriesCardStyles.listItemText, ...ShopStyles.shopFilterOptionTypo }}>{title}</Typography>
                <ExpandMoreIcon />
            </Box>
            {options.map((option, index) => (
                <Box key={index} sx={{ display: "flex" }}>
                    <Checkbox
                        value={option.id}
                        checked={selected.includes(option.id)}
                        onChange={() => handleChange(option.id)}
                        sx={{ ...RegistrationStyles.checkBoxStyle, mt: "-0.1rem" }} />
                    <Typography sx={{ ...RegistrationStyles.subTitle, ...RegistrationStyles.checkBoxTypo }}>{option.label}</Typography>
                </Box>
            ))}
        </Box>
    );
}