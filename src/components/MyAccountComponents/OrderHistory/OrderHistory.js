"use client"

import { ContactFormStyles, FAQsStyles, FooterMainStyles, WhyChooseUsStyles, ProductCardStyles, MyAccountStyles } from '@/components/Ui/Styles/Styles'
import { Typography, Box, Button } from '@mui/material'
import DeviceImg from "../../Ui/Assets/AddToCart/DeviceImg.svg"
import Emptycart from "../../Ui/Assets/AddToCart/ShoppingEmptyCart.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import the arrow icon
import Image from 'next/image'
import { useSelector } from 'react-redux'
import React from 'react'

const orders = [
    {
        label: 'Raw Black T-Shirt Lineup',
        date: '27 July 2023',
        price: '$70.00',
        status: 'Processing',
        imgPath: DeviceImg
    },
    {
        label: 'Raw Black T-Shirt Lineup',
        date: '27 July 2023',
        price: '$70.00',
        status: 'Completed',
        imgPath: DeviceImg
    },
    {
        label: 'Raw Black T-Shirt Lineup',
        date: '27 July 2023',
        price: '$70.00',
        status: 'Processing',
        imgPath: DeviceImg
    },
    // Add more orders as needed
];

function OrderHistory() {

    const customerId = useSelector((state => state.medusaConfig.customer_id))

    return (
        <>
            {customerId !== "" ? (
                orders.length > 0 ? (
                    <Box sx={MyAccountStyles.containerBox}>
                        <Typography sx={{ ...FAQsStyles.title, ...MyAccountStyles.headingTypo }}>Order History</Typography>

                        {orders.map((order, index) => (
                            <Box key={index} sx={{ ...FooterMainStyles.firstGrid, ...MyAccountStyles.contentBox }}>
                                <Box sx={MyAccountStyles.firstBox}>
                                    <Box>
                                        <Image src={order.imgPath} alt="Order Image" />
                                    </Box>
                                    <Box sx={MyAccountStyles.typoBox}>
                                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont }}>
                                            {order.label}
                                        </Typography>
                                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...MyAccountStyles.typoFontSize, color: "#5C5F6A", }}>
                                            Ordered on: {order.date}
                                        </Typography>
                                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont, ...MyAccountStyles.typoFontSize }}>
                                            {order.price}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ ...MyAccountStyles.secondBoxWishlist, ...MyAccountStyles.secondBoxOrderHistory }}>
                                    <Typography sx={{ ...MyAccountStyles.orderPriceTypo, borderBottom: `1px solid ${order.status === 'Complete' ? 'darkgreen' : '#0E1422'}`, }}>
                                        {order.status}
                                    </Typography>
                                    <Box sx={{ ...ContactFormStyles.buttonBox, ...MyAccountStyles.buttonBox }} >
                                        <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, ...MyAccountStyles.viewItemButton }} >View item</Button>
                                    </Box>
                                    <Box sx={{ ...ContactFormStyles.buttonBox, ...MyAccountStyles.buttonBox }} >
                                        <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton }} >Track Order</Button>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Box sx={MyAccountStyles.emptyHistoryContainerBox} >
                        <Box sx={{ ...FooterMainStyles.firstGrid, gap: "2rem" }} >
                            <Box sx={MyAccountStyles.emptyHistoryImageBox}>
                                <Image src={Emptycart} alt="Empty Cart" />
                            </Box>
                            <Typography sx={MyAccountStyles.emptyHistorySubtitle}>
                                Your order history is waiting to be filled.
                            </Typography>
                            <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton }} >
                                Start Shopping <ArrowForwardIcon sx={{ width: 22 }} />
                            </Button>
                        </Box>
                    </Box>
                )
            ) : (
                <Box sx={MyAccountStyles.emptyHistoryContainerBox}>
                    <Typography sx={{ ...FAQsStyles.title, ...MyAccountStyles.headingTypo }}>
                        Please Login first to check History or place orders.
                    </Typography>
                </Box>
            )}
        </>
    );
}

export default OrderHistory;
