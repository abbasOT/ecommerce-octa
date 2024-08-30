"use client"

import React from 'react'
import OrderDetailForm from '../OrderDetailForm/OrderDetailForm'
import { Grid } from '@mui/material'
import { FooterMainStyles, ContactFormStyles, OrderStyles } from '@/components/Ui/Styles/Styles'
import OrderTrackSummaryCard from '../OrderTrackSummaryCard/OrderTrackSummaryCard'

function OrderDetailMain() {
    return (
        <Grid container spacing={5} mb={5}  >
            <Grid item xs={12} sm={12} md={12} lg={6} mt={2} sx={{ ...FooterMainStyles.firstGrid, ...ContactFormStyles.formGrid, ...OrderStyles.orderDetailMainFirstGrid }} >
                <OrderDetailForm />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={OrderStyles.orderDetailMainSecondGrid} >
                <OrderTrackSummaryCard />
            </Grid>
        </Grid>
    )
}

export default OrderDetailMain
