"use client"

import WhyChooseUS from '@/components/HomeComponents/WhyChooseUs/WhyChooseUs'
import FooterBar from '@/components/LayoutComponents/Footer/FooterBar/FooterBar'
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain'
import BreadCrumb from '@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb'
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar'
import HeaderMain from '@/components/LayoutComponents/Header/HeaderMain/HeaderMain'
import NavBar from '@/components/LayoutComponents/Header/Navbar/Navbar'
import OrderFinalStatusCard from '@/components/OrderComponents/OrderFinalStatusCard/OrderFinalStatusCard'
import OrderTrackSteps from '@/components/OrderComponents/OrderTrackSteps/OrderTrackSteps'
import TrackOrderMain from '@/components/OrderComponents/TrackOrderMain/TrackOrderMain'
import React from 'react'

function TrackOrderPage() {
    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <BreadCrumb />
            <TrackOrderMain />
            <WhyChooseUS />
            <FooterBar />
            <FooterMain />
        </>
    )
}

export default TrackOrderPage
