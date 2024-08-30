
"use client"

import LogIn from "@/components/RegistrationComponents/LogIn/LogIn";
import HeaderBar from "@/components/LayoutComponents/Header/HeaderBar/HeaderBar";
import FooterMain from "@/components/LayoutComponents/Footer/FooterMain/FooterMain";
import HeaderMain from "@/components/LayoutComponents/Header/HeaderMain/HeaderMain";
import NavBar from "@/components/LayoutComponents/Header/Navbar/Navbar";
import FooterBar from "@/components/LayoutComponents/Footer/FooterBar/FooterBar";
import WhyChooseUs from "@/components/HomeComponents/WhyChooseUs/WhyChooseUs";
import AboutUsMain from "@/components/AboutUsComponents/AboutUsMain/AboutUsMain";
import BreadCrumb from "@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb";



export default function AboutPage() {
    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <BreadCrumb />
            <AboutUsMain />
            <WhyChooseUs />
            <FooterBar />
            <FooterMain />
        </>
    );
}
