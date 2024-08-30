"use client"

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import GLobalDelivery from "../../Ui/Assets/Home/GlobalDelivery.svg"
import EasePayment from "../../Ui/Assets/Home/EasyPayment.svg"
import FreeShipping from "../../Ui/Assets/Home/FreeShipping.svg"
import FullDaySupport from "../../Ui/Assets/Home/FullDaySupport.svg"
import Image from 'next/image';
import { FooterMainStyles, WhyChooseUsStyles, ProductCardStyles, DisplayProductsStyles } from '@/components/Ui/Styles/Styles';
import HeadingBar from '../HeadingBar/HeadingBar';
const Data = [{ icon: GLobalDelivery, title: "GLOBAL DELIVERY", text: "Experience Hassle-Free Shipping and Seamless Global Connectivity with Our Trustworthy and Efficient Delivery Service across the world" }, { icon: EasePayment, title: "FREE SHIPPING", text: "Shop to Your Heart's Content Without Worrying About Shipping Costs: Our Free Shipping Service Delivers Your Purchases with a Smile, Straight to Your Doorstep!" },
{ icon: FreeShipping, title: "EASY PAYMENT", text: "Shop and Pay with Ease: Our Free Shipping Service Not Only Delivers Your Packages for Free, but Also Offers Easy Payment Options, Making Your Shopping Experience a Breeze!" }, { icon: FullDaySupport, title: "24/7 SUPPORTING", text: "Shop with Confidence Anytime, Anywhere: Our Free Shipping Service Comes with 24/7 Support to Ensure Your Packages Arrive Safely and On Time!" }];

function WhyChooseUS() {
    return (
        <Box sx={WhyChooseUsStyles.containerBox}>
            <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...DisplayProductsStyles.headingStyle }}>
                Why Choose Us?
            </Typography>
            <HeadingBar leftValue={"50%"} transformValue={'translateX(-50%)'} />
            <Grid container spacing={1} mt={1} >
                {Data.map((item, index) => (
                    <Grid key={index} item xs={12} sm={6} md={6} lg={3} sx={{ ...FooterMainStyles.firstGrid, ...WhyChooseUsStyles.contentBox }}>
                        <Image src={item.icon} />
                        <Typography sx={WhyChooseUsStyles.WhyChooseUsTitle}>
                            {item.title}
                        </Typography>
                        <Typography sx={WhyChooseUsStyles.WhyChooseUsDescription}>
                            {item.text}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default WhyChooseUS;




