"use client"

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Container } from '@mui/material';
import { FAQsData } from './FAQsData';
import { CategoriesCardStyles, FAQsStyles, FooterMainStyles } from '@/components/Ui/Styles/Styles';
export default function FAQs() {
    const category = "CircuitHub"
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container sx={FAQsStyles.containerBox}>
            <Typography sx={FAQsStyles.title}>Frequently Asked Questions</Typography>
            <Typography sx={FAQsStyles.subtitle}>Everything you need to know about the product and billing.</Typography>

            {FAQsData[category] && Object.values(FAQsData[category]).map((faq, index) => (
                <>
                    <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} sx={FAQsStyles.accordionStyle}>
                        <AccordionSummary
                            expandIcon={expanded === `panel${index}` ? <RemoveCircleOutlineIcon style={{ color: 'var(--primary-color)' }} /> : <AddCircleOutlineIcon style={{ color: 'var(--primary-color)' }} />}
                            aria-controls={`panel${index}bh-content`}
                            id={`panel${index}bh-header`}
                            style={FAQsStyles.accordionSummaryStyle}
                        >
                            <Typography sx={{ ...CategoriesCardStyles.listItemText, ...FAQsStyles.accordianSummaryTypo }}>{faq.heading}</Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                            <Typography sx={{ ...FooterMainStyles.firstDescription, ...FooterMainStyles.secondDescription, ...FAQsStyles.accordianDetailsTypo }}>{faq.description}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </>
            ))}

        </Container>
    );
}

