"use client"

import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { RegistrationStyles, FooterMainStyles, ContactFormStyles, orderStatusCardStyles } from '@/components/Ui/Styles/Styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OrderComplete from "../../Ui/Assets/Order/orderComplete.svg"
import OrderFailed from "../../Ui/Assets/Order/orderError.svg"
import Image from 'next/image'

function OrderFinalStatusCard({ bgStripColor, imgName, title, actionButtonName }) {

    const orderImage = imgName === "OrderFailed" ? OrderFailed : OrderComplete

    return (
        <Box sx={{ ...RegistrationStyles.outerBox, }}>
            <Box sx={{ ...orderStatusCardStyles.backgroundStrip, background: bgStripColor }}>
            </Box>
            <Box sx={{ ...RegistrationStyles.formBox, ...orderStatusCardStyles.contentBox }}>
                <Image src={orderImage} />
                {imgName === "OrderComplete" &&
                    <Typography sx={{ ...orderStatusCardStyles.textStyle, ...orderStatusCardStyles.thankyouStyle }}>Thank you! 🎉</Typography>}

                <Typography sx={{ ...RegistrationStyles.title, ...orderStatusCardStyles.titleTypo }}>
                    {title}
                </Typography>
                {imgName === "OrderFailed" ?
                    <Typography sx={{ ...RegistrationStyles.subTitle, ...orderStatusCardStyles.subTitleTypo }}>
                        Oops! There was a problem processing your order. Please review the details and try again.
                    </Typography>
                    :
                    <Box sx={orderStatusCardStyles.orderCompleteDetailContainer}>
                        <Box sx={orderStatusCardStyles.orderCompleteDetailBox}>
                            {orderDetails.map((detail, index) => (
                                <Typography key={index} sx={orderStatusCardStyles.textStyle}>
                                    {detail.label}
                                </Typography>
                            ))}
                        </Box>
                        <Box sx={orderStatusCardStyles.orderCompleteDetailBox}>
                            {orderDetails.map((detail, index) => (
                                <Typography key={index} sx={{ ...orderStatusCardStyles.orderDetailValueColor, ...orderStatusCardStyles.textStyle }}>
                                    {detail.value}
                                </Typography>
                            ))}
                        </Box>
                    </Box>}
                <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, ...orderStatusCardStyles.buttonStyle }} >
                    {actionButtonName} <ArrowForwardIcon sx={{ width: 22 }} /></Button>
            </Box>
        </Box >

    )
}

export default OrderFinalStatusCard


const orderDetails = [
    { label: "Date:", value: "October 19, 2023" },
    { label: "Total:", value: "$1,345.00" },
    { label: "Payment method:", value: "Credit Card" }
];