"use client"
import React, { useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material';
import { FooterMainStyles, WhyChooseUsStyles, DeliveryHoursStyles } from '@/components/Ui/Styles/Styles';
import DeliveryTruck from "../../Ui/Assets/Home/DeliveryTruck.svg"
import Image from 'next/image';
import { setAllCategoriesWithProducts, } from '@/redux/slices/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import { updateOrderValue } from '@/redux/slices/orderSlice';
const Data = [{ icon: DeliveryTruck, title: "Delivery in 2-3 Hours in Rawalpindi & Islamabad", text: "Discounts is nearer for all Electronics in this Platform" }];
import medusa from '@/medusaClient';
import { customer_id } from '@/redux/slices/medusaConfig';
function DeliveryHours() {

    const dispatch = useDispatch();
    // const medusa = useSelector((state) => state.medusaConfig.medusa);

    // medusa.customers.retrieve()
    //     .then(({ customer }) => {
    //         dispatch(customer_id(customer.id))
    //         dispatch(updateOrderValue({ name: 'customerId', value: customer.id }))
    //     })

    useEffect(() => {
        // Function to handle token extraction and decoding
        const handleGoogleAuth = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('access_token');
            const rememberMe = localStorage.getItem("rememberMe")
            console.log('token value', token)
            if (!token) {
                return null;
            }
            try {
                const decoded = jwtDecode(token); // Decode the JWT
                console.log('decoded token', decoded);
                const customerId = decoded.customer_id;
                // Save customer_id to localStorage if it exists
                if (customerId) {
                    if (typeof window !== 'undefined') {
                        if (rememberMe) {
                            // Save customerId in localStorage if "Remember Me" is checked
                            localStorage.setItem('customerId', customerId);
                          
                        } else {
                            // Save customerId in sessionStorage if "Remember Me" is not checked
                            sessionStorage.setItem('customerId', customerId);
                        }
                        dispatch(customer_id(customerId))
                    }                
                    console.log('customer_id', customerId)
                }
            } catch {
                return null;
            }
        };

        handleGoogleAuth(); // Execute on component mount
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/product_category_product/read');
                dispatch(setAllCategoriesWithProducts(response.data.categoryWithProducts))
                console.log(response.data.categoryWithProducts, "comming from db")
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={DeliveryHoursStyles.containerBox}>
            {Data.map((item, index) => (
                <Grid key={index} item xs={12} sm={12} md={12} lg={12} sx={{ ...FooterMainStyles.firstGrid, ...DeliveryHoursStyles.contentBox, }}>
                    <Image src={item.icon} />
                    <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...DeliveryHoursStyles.DeliveryHoursTitle }}>
                        {item.title}
                    </Typography>
                    <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsDescription, ...DeliveryHoursStyles.DeliveryHoursDescription }}>
                        {item.text}
                    </Typography>
                </Grid>
            ))}
        </Box>
    )
}

export default DeliveryHours












