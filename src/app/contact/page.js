
"use client"

import LogIn from "@/components/RegistrationComponents/LogIn/LogIn";
import HeaderBar from "@/components/LayoutComponents/Header/HeaderBar/HeaderBar";
import FooterMain from "@/components/LayoutComponents/Footer/FooterMain/FooterMain";
import HeaderMain from "@/components/LayoutComponents/Header/HeaderMain/HeaderMain";
import NavBar from "@/components/LayoutComponents/Header/Navbar/Navbar";
import FooterBar from "@/components/LayoutComponents/Footer/FooterBar/FooterBar";
import FAQs from "@/components/ContactComponents/FAQs/FAQs";
import GetInTouch from "@/components/ContactComponents/GetInTouch/GetInTouch";
import BreadCrumb from "@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb";



export default function ContactPage() {
    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <BreadCrumb />
            <GetInTouch />
            <FAQs />
            <FooterBar />
            <FooterMain />
        </>
    );
}
