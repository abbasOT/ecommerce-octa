"use client"

import { ContactFormStyles, FAQsStyles, FooterMainStyles, WhyChooseUsStyles, ProductCardStyles, MyAccountStyles } from '@/components/Ui/Styles/Styles'
import { Typography, Box, Button, CircularProgress } from '@mui/material'
import DeviceImg from "../../Ui/Assets/AddToCart/DeviceImg.svg"
import Emptycart from "../../Ui/Assets/AddToCart/ShoppingEmptyCart.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import the arrow icon
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import medusa from '@/medusaClient';  // Adjust the import path as necessary
import { searchValues } from '@/redux/slices/searchBar'
import { setSelectedCategory, setSelectedCategoryWithProducts } from '@/redux/slices/categoriesSlice'


function OrderHistory() {
    const router = useRouter();
    const dispatch = useDispatch();
    const customerId = useSelector((state => state.medusaConfig.customer_id))
    const [loading, setLoading] = useState(true);
    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        if (customerId) {
            // Fetch customer orders when the component mounts and customerId is available
            medusa.customers.listOrders()
                .then(({ orders, limit, offset, count }) => {
                    setCustomerOrders(orders);
                    console.log(orders);
                    setLoading(false);
                })
                .catch(err => console.error(err));
        }
        else {
            setLoading(false);
        }
    }, [customerId]);

    console.log(customerOrders, "the customer orders i am looking for ")

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleShopping = (title) => {
        dispatch(searchValues({ searchQuery: title }));
        dispatch(setSelectedCategory(""));
        dispatch(setSelectedCategoryWithProducts(""));
        router.push('/shop');
    }


    const truncateTitle = (title) => {
        if (title.length > 20) {
            return title.substring(0, 20) + '...';
        }
        return title;
    };


    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress sx={{ color: 'var(--primary-color)' }} />
                </Box>
            ) : (
                <>
                    {customerId !== "" ? (
                        customerOrders.length > 0 ? (
                            <Box sx={MyAccountStyles.containerBox}>
                                <Typography sx={{ ...FAQsStyles.title, ...MyAccountStyles.headingTypo }}>Order History</Typography>
                                {customerOrders.map((order, index) => (
                                    <Box key={index} sx={{ ...FooterMainStyles.firstGrid, ...MyAccountStyles.contentBox }}>
                                        <Box sx={MyAccountStyles.firstBox}>
                                            <Box>
                                                <img src={order.items[0]?.thumbnail} width={85} height={85} alt="Order Image" />
                                            </Box>
                                            <Box sx={MyAccountStyles.typoBox}>
                                                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont }}>
                                                    {truncateTitle(order.items[0]?.title)}
                                                </Typography>
                                                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...MyAccountStyles.typoFontSize, color: "#5C5F6A", }}>
                                                    Ordered on: {formatDate(order.created_at)}
                                                </Typography>
                                                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont, ...MyAccountStyles.typoFontSize }}>
                                                    {order.total}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ ...MyAccountStyles.secondBoxWishlist, ...MyAccountStyles.secondBoxOrderHistory }}>
                                            <Typography sx={{ ...MyAccountStyles.orderPriceTypo, borderBottom: `1px solid ${order.fulfillment_status === 'fulfilled' ? 'darkgreen' : '#0E1422'}`, }}>
                                                {order.fulfillment_status === 'fulfilled' ? 'Complete' : 'Processing'}
                                            </Typography>
                                            <Box sx={{ ...ContactFormStyles.buttonBox, ...MyAccountStyles.buttonBox }}>
                                                <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, ...MyAccountStyles.viewItemButton }} onClick={() => handleShopping(order.items[0]?.title)}>View item</Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Box sx={MyAccountStyles.emptyHistoryContainerBox}>
                                <Box sx={{ ...FooterMainStyles.firstGrid, gap: "2rem" }}>
                                    <Box sx={MyAccountStyles.emptyHistoryImageBox}>
                                        <Image src={Emptycart} alt="Empty Cart" />
                                    </Box>
                                    <Typography sx={MyAccountStyles.emptyHistorySubtitle}>
                                        Your order history is waiting to be filled.
                                    </Typography>
                                    <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton }} onClick={handleShopping}>
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
            )}
        </>
    );
}

export default OrderHistory;
