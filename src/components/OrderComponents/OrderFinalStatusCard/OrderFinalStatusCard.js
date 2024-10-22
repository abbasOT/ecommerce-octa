"use client"

import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { RegistrationStyles, FooterMainStyles, ContactFormStyles, orderStatusCardStyles } from '@/components/Ui/Styles/Styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OrderComplete from "../../Ui/Assets/Order/orderComplete.svg"
import OrderFailed from "../../Ui/Assets/Order/orderError.svg"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image'
import { clearCart } from '@/redux/slices/productSlice';


function OrderFinalStatusCard({ bgStripColor, imgName, title, actionButtonName }) {

    const router = useRouter()
    const dispatch = useDispatch()

    const orderImage = imgName === "OrderFailed" ? OrderFailed : OrderComplete
    const currentOrderDetails = useSelector((state) => state.order);
    const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const totalAmount = currentOrderDetails.totalAmount

    useEffect(() => {
        if (actionButtonName === "Continue Shopping") {
            dispatch(clearCart()); // Clear cart only when the actionButtonName is not "Continue Shopping"
        }
    }, [actionButtonName]);

    const handleActionbutton = () => {
        router.push(actionButtonName === "Continue Shopping" ? '/shop' : '/add-to-cart');
    }

    const orderDetails = [
        { label: "Date:", value: formattedDate },
        { label: "Total:", value: totalAmount },
        { label: "Payment method:", value: currentOrderDetails.paymentMethod }
    ];

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
                <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, ...orderStatusCardStyles.buttonStyle }} onClick={handleActionbutton} >
                    {actionButtonName} <ArrowForwardIcon sx={{ width: 22 }} /></Button>
            </Box>
        </Box >

    )
}

export default OrderFinalStatusCard


