

// import HeaderBar from "@/components/LayoutComponents/Header/HeaderBar/HeaderBar";
// import FooterMain from "@/components/LayoutComponents/Footer/FooterMain/FooterMain";
// import HeaderMain from "@/components/LayoutComponents/Header/HeaderMain/HeaderMain";
// import NavBar from "@/components/LayoutComponents/Header/Navbar/Navbar";
// import FooterBar from "@/components/LayoutComponents/Footer/FooterBar/FooterBar";
// import FAQs from "@/components/ContactComponents/FAQs/FAQs";
// import GetInTouch from "@/components/ContactComponents/GetInTouch/GetInTouch";
// import BreadCrumb from "@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb";

import dynamic from 'next/dynamic';

// Dynamically import components
const HeaderBar = dynamic(() => import('@/components/LayoutComponents/Header/HeaderBar/HeaderBar'), {
});
const FooterMain = dynamic(() => import('@/components/LayoutComponents/Footer/FooterMain/FooterMain'), {
});
const HeaderMain = dynamic(() => import('@/components/LayoutComponents/Header/HeaderMain/HeaderMain'), {
});
const NavBar = dynamic(() => import('@/components/LayoutComponents/Header/Navbar/Navbar'), {
});
const FooterBar = dynamic(() => import('@/components/LayoutComponents/Footer/FooterBar/FooterBar'), {
});
const FAQs = dynamic(() => import('@/components/ContactComponents/FAQs/FAQs'), {
});
const GetInTouch = dynamic(() => import('@/components/ContactComponents/GetInTouch/GetInTouch'), {
});
const BreadCrumb = dynamic(() => import('@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb'), {
});



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
