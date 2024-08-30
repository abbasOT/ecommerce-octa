"use client"

import AddToCartMain from '@/components/AddToCartComponents/AddToCartMain/AddToCartMain'
import WhyChooseUs from '@/components/HomeComponents/WhyChooseUs/WhyChooseUs'
import FooterBar from '@/components/LayoutComponents/Footer/FooterBar/FooterBar'
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain'
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar'
import HeaderMain from '@/components/LayoutComponents/Header/HeaderMain/HeaderMain'
import NavBar from '@/components/LayoutComponents/Header/Navbar/Navbar'
import OrderTrackSteps from '@/components/OrderComponents/OrderTrackSteps/OrderTrackSteps'
import React from 'react'

function AddToCartPage() {
    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <OrderTrackSteps activeStepValue={0} />
            <AddToCartMain />

            <WhyChooseUs />
            <FooterBar />
            <FooterMain />
        </>
    )
}

export default AddToCartPage
