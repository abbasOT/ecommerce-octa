"use client"

import WhyChooseUS from '@/components/HomeComponents/WhyChooseUs/WhyChooseUs'
import FooterBar from '@/components/LayoutComponents/Footer/FooterBar/FooterBar'
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain'
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar'
import HeaderMain from '@/components/LayoutComponents/Header/HeaderMain/HeaderMain'
import NavBar from '@/components/LayoutComponents/Header/Navbar/Navbar'
import OrderDetailForm from '@/components/OrderComponents/OrderDetailForm/OrderDetailForm'
import OrderDetailMain from '@/components/OrderComponents/OrderDetailMain/OrderDetailMain'
import OrderTrackSteps from '@/components/OrderComponents/OrderTrackSteps/OrderTrackSteps'
import React from 'react'

function OrderDetailPage() {
    return (

        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <OrderTrackSteps activeStepValue={1} />
            <OrderDetailMain />
            <WhyChooseUS />
            <FooterBar />
            <FooterMain />
        </>
    )

}

export default OrderDetailPage
