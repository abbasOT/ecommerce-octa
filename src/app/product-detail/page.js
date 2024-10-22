"use client"

import DisplayProducts from '@/components/HomeComponents/DisplayProducts/DisplayProducts'
import FooterBar from '@/components/LayoutComponents/Footer/FooterBar/FooterBar'
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain'
import BreadCrumb from '@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb'
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar'
import HeaderMain from '@/components/LayoutComponents/Header/HeaderMain/HeaderMain'
import NavBar from '@/components/LayoutComponents/Header/Navbar/Navbar'
import ProductDetailMain from '@/components/ProductDetail/ProductDetailMain/ProductDetailMain'
import { Box } from '@mui/material'
import React from 'react'

function ProductDetailPage() {
    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <BreadCrumb />
            <ProductDetailMain />

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                <Box sx={{ width: { md: '80%', xs: "100%" }, }}>
                    <DisplayProducts heading={"Similar Products"} />
                </Box>
            </Box>
            <FooterBar />
            <FooterMain />
        </>
    )
}

export default ProductDetailPage
