"use client"

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import GLobalDelivery from "../../Ui/Assets/Home/GlobalDelivery.svg"
import EasePayment from "../../Ui/Assets/Home/EasyPayment.svg"
import FreeShipping from "../../Ui/Assets/Home/FreeShipping.svg"
import Heart from "../../Ui/Assets/Home/cartHeart.svg"
import Product from "../../Ui/Assets/Home/ProductImg.svg"
import Line from "../../Ui/Assets/Home/cartLine.svg"
import Bg from "../../Ui/Assets/Home/productOnSaleBg.svg"
import { useSelector } from 'react-redux';

import Image from 'next/image';
import { FooterMainStyles, RegistrationStyles, ServiceCardStyles, WhyChooseUsStyles, ProductCardStyles, ProductOnSaleStyles } from '@/components/Ui/Styles/Styles';
import ProductCard from '../ProductCard/ProductCard';



function ProductOnSale() {

    const products = useSelector((state) => state.product.allProducts);
    const productsOnSale = products.filter(product => product.collection?.title === "Products on Sale");




    return (
        <Box sx={ProductOnSaleStyles.containerBox}>
            <Grid container spacing={1}  >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={2.5} sx={ProductOnSaleStyles.typoGridStyle} >
                    <Box>
                        <Typography sx={{ ...FooterMainStyles.FooterBarContentTypo, ...ProductOnSaleStyles.firstHeading }}>
                            Products On Sale
                        </Typography>
                        <Typography sx={{ ...FooterMainStyles.FooterBarContentTypo, ...ProductOnSaleStyles.secondHeading }}>
                            Shop Now!
                        </Typography>
                    </Box>
                </Grid>


                {productsOnSale.map(product => (
                    <Grid key={product.id} item xs={12} sm={6} xl={4} sx={{ ...FooterMainStyles.firstGrid, ...WhyChooseUsStyles.contentBox }}>
                        <ProductCard product={product} />
                    </Grid>
                ))}

            </Grid>
        </Box >
    );
}

export default ProductOnSale;






{/* <Box sx={{ ...RegistrationStyles.formBox, ...ServiceCardStyles.cardBox, ...ProductOnSaleStyles.cartBox }}>
                        <Box sx={ProductCardStyles.heartBox}>
                            <Image src={Heart} width={25} />
                        </Box>
                        <Image src={Product} />
                        <Image src={Line} width={250} />
                        <Box sx={ProductCardStyles.contentBox}>
                            <Box sx={ProductCardStyles.descriptionBox}>
                                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo }}>
                                    Iphone 14 promax 256 gig
                                </Typography>
                                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont }}>
                                    $930.90
                                </Typography>
                            </Box>

                        </Box>
                    </Box> */}