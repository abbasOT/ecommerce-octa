"use client"

import React from 'react';
import prisma from '../../../../prisma/prisma';
import { Box, Typography, Grid, Stack, Rating } from '@mui/material';
import { FooterMainStyles, WhyChooseUsStyles, HappyCustomersStyles, ProductCardStyles, DisplayProductsStyles } from '@/components/Ui/Styles/Styles';
import HeadingBar from '../HeadingBar/HeadingBar';
const Data = [{ name: "Jenny Wilson", company: "Grower.io", msg: "Experience Hassle-Free Shipping and Seamless Global Connectivity with Our Trustworthy and Efficient Delivery Service across the world" }, { name: "Jenny Wilson", company: "Grower.io", msg: "Shop to Your Heart's Content Without Worrying About Shipping Costs: Our Free Shipping Service Delivers Your Purchases with a Smile, Straight to Your Doorstep!" },
{ name: "Jenny Wilson", company: "Grower.io", msg: "Shop and Pay with Ease: Our Free Shipping Service Not Only Delivers Your Packages for Free, but Also Offers Easy Payment Options, Making Your Shopping Experience a Breeze!" },];

function HappyCustomers() {

    return (
        <Box sx={HappyCustomersStyles.containerBox}>
            <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...DisplayProductsStyles.headingStyle }}>
                Our Happy Customers
            </Typography>
            <HeadingBar leftValue={"50%"} transformValue={'translateX(-50%)'} />
            <Grid container spacing={1} mt={1} >
                {Data.map((item, index) => (
                    <Grid key={index} item xs={12} sm={index === Data.length - 1 ? 12 : 6} md={4} lg={4} sx={{ ...FooterMainStyles.firstGrid, ...WhyChooseUsStyles.contentBox, }}>
                        <Stack spacing={1}>
                            <Rating name="size-medium" defaultValue={2} sx={HappyCustomersStyles.RatingColor} />
                        </Stack>

                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsDescription, ...HappyCustomersStyles.HappyCustomerMsg }}>
                            {"“" + item.msg + "”"}
                        </Typography>
                        <Box sx={ProductCardStyles.contentBox}>
                            <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...HappyCustomersStyles.HappyCustomerName }}>
                                {item.name}
                            </Typography>
                            <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...HappyCustomersStyles.HappyCustomerCompany }}>
                                {item.company}
                            </Typography>
                        </Box>

                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default HappyCustomers;




