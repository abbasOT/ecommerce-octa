"use client"

import React from 'react';
import { Grid, Box, Typography, Button, TextField, InputAdornment, List, ListItem, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FooterMainStyles } from '@/components/Ui/Styles/Styles';
export default function FooterAccordion() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (

        <Box width={"90%"}>
            {accordionData.map((section, index) => (
                <Accordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    sx={{ ...FooterMainStyles.FooterAccordionStyle, marginTop: index !== 0 ? "1rem" : "0" }}
                >
                    <AccordionSummary
                        expandIcon={expanded === `panel${index}` ? <RemoveIcon style={{ color: 'var(--primary-color)' }} /> : <AddIcon style={{ color: 'var(--primary-color)' }} />}
                        aria-controls={`panel${index}bh-content`}
                        id={`panel${index}bh-header`}
                        style={FooterMainStyles.FooterAccordionSummaryStyle}
                    >
                        <Typography sx={FooterMainStyles.listHeadingStyle}>{section.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List sx={FooterMainStyles.secondDescription}>
                            {section.items.map((item, itemIndex) => (
                                <ListItem key={itemIndex}>{item}</ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>

    );
}


const accordionData = [
    {
        title: "Categories",
        items: [
            "Discrete electronic Components",
            "Modules & Breakout Boards",
            "Connectivity",
            "Motors & Drivers",
            "Resistors",
            "Robotics & Machines"
        ]
    },
    {
        title: "Useful Links",
        items: [
            "Home",
            "Contact Us",
            "About Us",
            "Privacy Policy",
            "Terms & Condition",
            "Returns"
        ]
    }
];
