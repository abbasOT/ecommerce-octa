

import LogIn from "@/components/RegistrationComponents/LogIn/LogIn";
import HeaderBar from "@/components/LayoutComponents/Header/HeaderBar/HeaderBar";
import FooterMain from "@/components/LayoutComponents/Footer/FooterMain/FooterMain";
import HeaderMain from "@/components/LayoutComponents/Header/HeaderMain/HeaderMain";
import NavBar from "@/components/LayoutComponents/Header/Navbar/Navbar";
import FooterBar from "@/components/LayoutComponents/Footer/FooterBar/FooterBar";
import ServiceDetail from "@/components/ServiceDetailComponents/ServiceDetail/ServiceDetail";
import BreadCrumb from "@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb";



export default function ServicePage() {
    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <BreadCrumb />
            <ServiceDetail />
            <FooterBar />
            <FooterMain />
        </>
    );
}
