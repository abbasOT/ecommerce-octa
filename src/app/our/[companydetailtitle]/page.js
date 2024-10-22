
"use client"

import LogIn from "@/components/RegistrationComponents/LogIn/LogIn";
import HeaderBar from "@/components/LayoutComponents/Header/HeaderBar/HeaderBar";
import FooterMain from "@/components/LayoutComponents/Footer/FooterMain/FooterMain";
import HeaderMain from "@/components/LayoutComponents/Header/HeaderMain/HeaderMain";
import NavBar from "@/components/LayoutComponents/Header/Navbar/Navbar";
import FooterBar from "@/components/LayoutComponents/Footer/FooterBar/FooterBar";
import BreadCrumb from "@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use this to access dynamic parameters
import CompanyDetail from "@/components/ServiceDetailComponents/CompanyDetail/CompanyDetail";


export default function CompanyPage() {
    const { companydetailtitle } = useParams();  // Dynamic parameter from the URL
    const [detailTitle, setDetailTitle] = useState(null);

    console.log(companydetailtitle, "the title i am looking for")


    useEffect(() => {
        // Fetch or load the service content dynamically based on serviceId
        if (companydetailtitle) {
            setDetailTitle(companydetailtitle); // Replace with actual API fetch if needed
        }
    }, [companydetailtitle]);



    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            {/* <BreadCrumb /> */}
            <CompanyDetail companyDetailTitle={detailTitle} />
            <FooterBar />
            <FooterMain />
        </>
    );
}
