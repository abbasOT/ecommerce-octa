// "use client"

// import FooterBar from '@/components/LayoutComponents/Footer/FooterBar/FooterBar'
// import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain'
// import BreadCrumb from '@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb'
// import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar'
// import HeaderMain from '@/components/LayoutComponents/Header/HeaderMain/HeaderMain'
// import NavBar from '@/components/LayoutComponents/Header/Navbar/Navbar'
// import ShopMain from '@/components/ShopComponents/ShopMain/ShopMain'

import dynamic from 'next/dynamic';

// Dynamically import components
const HeaderBar = dynamic(() => import('@/components/LayoutComponents/Header/HeaderBar/HeaderBar'));
const HeaderMain = dynamic(() => import('@/components/LayoutComponents/Header/HeaderMain/HeaderMain'));
const NavBar = dynamic(() => import('@/components/LayoutComponents/Header/Navbar/Navbar'));
const BreadCrumb = dynamic(() => import('@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb'));
const ShopMain = dynamic(() => import('@/components/ShopComponents/ShopMain/ShopMain'));
const FooterBar = dynamic(() => import('@/components/LayoutComponents/Footer/FooterBar/FooterBar'));
const FooterMain = dynamic(() => import('@/components/LayoutComponents/Footer/FooterMain/FooterMain'));

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
