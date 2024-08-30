"use client";

import React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import { RegistrationStyles, orderStatusCardStyles, FAQsStyles, ContactFormStyles, OrderStyles, DisplayProductsStyles } from '@/components/Ui/Styles/Styles';
import { Divider, Box, Typography, Button } from '@mui/material';

export default function OrderShippingIn() {
    const steps = [
        { label: "Order confirmed", description: "16 Jul 2020 - 08:00 PM", indicator: "1" },
        { label: "Package received on DHL New York city", description: "16 Jul 2020 - 08:00 PM", indicator: "2" },
        { label: "Package send from DHL New York city", description: "16 Jul 2020 - 08:00 PM", indicator: "3" },
        { label: "Package arrive on DHL Washington DC", description: "16 Jul 2020 - 08:00 PM", indicator: "4" },
        { label: "Package will send to your home by our courier (James)", description: "16 Jul 2020 - 08:00 PM", indicator: "5" },
    ];

    return (
        <Box pl={0.5} pr={0.5}>
            <Typography sx={{ ...FAQsStyles.title, ...OrderStyles.orderDetailFormTitleTypo }}>Shipping in</Typography>
            <Typography sx={{ ...OrderStyles.orderDetailShippingInTypo, pt: 1, ...OrderStyles.orderDetailFormTitleTypo }}>Will sent to 2972 Westheimer Rd. Santa Ana, Illinois 85486.</Typography>
            <Stepper orientation="vertical" sx={OrderStyles.orderDetailShippingInStepper}>
                {steps.map((step, index) => (
                    <Step key={index} sx={OrderStyles.orderDetailShippingInStep}
                        indicator={
                            <StepIndicator variant={index === 0 ? "solid" : "outlined"} sx={OrderStyles.orderDetailShippingInStepIndicator}>
                                {step.indicator}
                            </StepIndicator>} >
                        <Box sx={{ ml: 2 }}>
                            <Typography sx={{ ...RegistrationStyles.title, ...orderStatusCardStyles.titleTypo, ...OrderStyles.orderDetailShippingInStepLabel }}>{step.label}</Typography>
                            <Typography variant="body2" sx={OrderStyles.orderDetailShippingInTypo}>{step.description}</Typography>
                        </Box>
                    </Step>
                ))}
            </Stepper>
            <Divider sx={OrderStyles.orderDetailShippingInDivider} ></Divider>
            <Typography sx={{ ...FAQsStyles.title, ...OrderStyles.orderDetailFormTitleTypo, pb: 1 }}>Have been trouble on your package?</Typography>
            <Typography sx={{ ...OrderStyles.orderDetailShippingInTypo, ...OrderStyles.orderDetailFormTitleTypo }}>Will sent to 2972 Westheimer Rd. Santa Ana, Illinois 85486.</Typography>
            <Box sx={{ ...ContactFormStyles.buttonBox, ...OrderStyles.orderDetailShippingInButtonBox }} >
                <Button variant="contained" type='submit' sx={OrderStyles.orderDetailShippingInButton} >
                    Support me
                </Button>
            </Box>
        </Box >
    );
}
