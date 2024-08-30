"use client"

import FooterBar from '@/components/LayoutComponents/Footer/FooterBar/FooterBar'
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain'
import BreadCrumb from '@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb'
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar'
import HeaderMain from '@/components/LayoutComponents/Header/HeaderMain/HeaderMain'
import NavBar from '@/components/LayoutComponents/Header/Navbar/Navbar'
import ShopMain from '@/components/ShopComponents/ShopMain/ShopMain'
import React from 'react'

function ShopPage() {
    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <BreadCrumb />
            <ShopMain />
            <FooterBar />
            <FooterMain />
        </>
    )
}

export default ShopPage
