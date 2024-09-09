"use client"

import WhyChooseUS from '@/components/HomeComponents/WhyChooseUs/WhyChooseUs'
import FooterBar from '@/components/LayoutComponents/Footer/FooterBar/FooterBar'
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain'
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar'
import HeaderMain from '@/components/LayoutComponents/Header/HeaderMain/HeaderMain'
import NavBar from '@/components/LayoutComponents/Header/Navbar/Navbar'
import OrderDetailForm from '@/components/OrderComponents/OrderDetailForm/OrderDetailForm'
import OrderDetailMain from '@/components/OrderComponents/OrderDetailMain/OrderDetailMain'
import OrderFinalStatusCard from '@/components/OrderComponents/OrderFinalStatusCard/OrderFinalStatusCard'
import OrderTrackSteps from '@/components/OrderComponents/OrderTrackSteps/OrderTrackSteps'
import React from 'react'
import { useParams } from 'next/navigation'; // Use this to access dynamic parameters


function OrderDetailPage() {
    const { orderStatus } = useParams();  // Dynamic parameter from the URL
    console.log(orderStatus, "the orderstatus comming from params")
    let activeStepValue, bgStripColor, imgName, title, actionButtonName;

    if (orderStatus === "failed") {
        activeStepValue = 2;
        bgStripColor = "#FBD9D0";
        imgName = "OrderFailed";
        title = "Oops! There was an issue";
        actionButtonName = "Try Again";
    } else if (orderStatus === "complete") {
        activeStepValue = 3;
        bgStripColor = "#D5E5D7";
        imgName = "OrderComplete";
        title = "Thank you for shopping";
        actionButtonName = "Continue Shopping";
    }

    return (

        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <OrderTrackSteps activeStepValue={activeStepValue} />
            <OrderFinalStatusCard bgStripColor={bgStripColor} imgName={imgName} title={title} actionButtonName={actionButtonName} />
            <WhyChooseUS />
            <FooterBar />
            <FooterMain />
        </>
    )

}

export default OrderDetailPage
