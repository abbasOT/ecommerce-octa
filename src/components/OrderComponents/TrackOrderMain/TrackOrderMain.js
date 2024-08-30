"use client"

import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { FooterMainStyles, ContactFormStyles, OrderStyles } from '@/components/Ui/Styles/Styles'
import OrderShippingIn from '../OrderShippingIn/OrderShippingIn'
import OrderTrackSummaryCard from '../OrderTrackSummaryCard/OrderTrackSummaryCard'



function TrackOrderMain() {


    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/customer_order/read');
                const data = await response.json();

                if (response.ok) {
                    setOrders(data);
                } else {
                    setError(data.error);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('An unexpected error occurred.');
            }
        };

        fetchOrders();
    }, []);

    console.log(orders, "the orders values are...")

    return (
        <Grid container spacing={5} mb={5}  >
            <Grid item xs={12} sm={12} md={12} lg={6} mt={2} sx={{ ...FooterMainStyles.firstGrid, ...ContactFormStyles.formGrid }} >
                <OrderShippingIn />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={OrderStyles.orderDetailMainSecondGrid} >
                <OrderTrackSummaryCard />
            </Grid>
        </Grid>
    )
}

export default TrackOrderMain