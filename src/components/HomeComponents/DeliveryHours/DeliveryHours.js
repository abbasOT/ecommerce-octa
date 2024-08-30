"use client"
import React, { useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material';
import { FooterMainStyles, WhyChooseUsStyles, DeliveryHoursStyles } from '@/components/Ui/Styles/Styles';
import DeliveryTruck from "../../Ui/Assets/Home/DeliveryTruck.svg"
import Image from 'next/image';
import { setAllCategoriesWithProducts, } from '@/redux/slices/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { customer_id } from '@/redux/slices/medusaConfig';
import { updateOrderValue } from '@/redux/slices/orderSlice';
const Data = [{ icon: DeliveryTruck, title: "Delivery in 2-3 Hours in Rawalpindi & Islamabad", text: "Discounts is nearer for all Electronics in this Platform" }];
import medusa from '@/medusaClient';
function DeliveryHours() {

    const dispatch = useDispatch();
    // const medusa = useSelector((state) => state.medusaConfig.medusa);

    // medusa.customers.retrieve()
    //     .then(({ customer }) => {
    //         dispatch(customer_id(customer.id))
    //         dispatch(updateOrderValue({ name: 'customerId', value: customer.id }))
    //     })


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/product_category_product/read');
                dispatch(setAllCategoriesWithProducts(response.data.categoryWithProducts))
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











