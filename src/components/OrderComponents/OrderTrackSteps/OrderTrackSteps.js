"use client"
import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { ColorlibConnector, ColorlibStepIconRoot } from '@/components/Ui/Styles/SecondaryStyles';
import { AboutUsMainStyles, CategoriesCardStyles, OrderStyles } from '@/components/Ui/Styles/Styles';
import { Typography, Box } from '@mui/material';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';



const steps = ['Cart', 'Detail', 'Order Complete'];

export default function OrderTrackSteps({ activeStepValue }) {
    return (
        <Box sx={AboutUsMainStyles.containerBox}>
            <Stack sx={OrderStyles.orderDetailTrackStepperStack} spacing={3}>
                <Stepper alternativeLabel activeStep={activeStepValue} connector={<ColorlibConnector />}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>
                                <Typography sx={{
                                    ...CategoriesCardStyles.listItemText,
                                    color: activeStepValue === 2 && index === 2 ? "#EF7E64" :
                                        activeStepValue === 1 && index === 2 ? "#C6C6C6" :
                                            activeStepValue === 0 && index > 0 ? "#C6C6C6" :
                                                "#000"
                                }}>
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>
        </Box>
    );
}


function ColorlibStepIcon(props) {
    const { active, completed, className, icon } = props;
    const isLastStep = icon === 3;

    const icons = {
        1: <ShoppingBagOutlinedIcon />,
        2: <AccountCircleOutlinedIcon />,
        3: <CreditCardOutlinedIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active, isLastStep }} className={className}>
            {icons[String(icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.node,
};
OrderTrackSteps.propTypes = {
    activeStepValue: PropTypes.number.isRequired,
};
