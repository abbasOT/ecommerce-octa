
"use client"

import LogIn from "@/components/RegistrationComponents/LogIn/LogIn";
import HeaderBar from "@/components/LayoutComponents/Header/HeaderBar/HeaderBar";
import FooterMain from "@/components/LayoutComponents/Footer/FooterMain/FooterMain";
import HeaderMain from "@/components/LayoutComponents/Header/HeaderMain/HeaderMain";
import NavBar from "@/components/LayoutComponents/Header/Navbar/Navbar";
import FooterBar from "@/components/LayoutComponents/Footer/FooterBar/FooterBar";
import ServiceDetail from "@/components/ServiceDetailComponents/ServiceDetail/ServiceDetail";
import BreadCrumb from "@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use this to access dynamic parameters


export default function ServicePage() {
    const { serviceId } = useParams();  // Dynamic parameter from the URL
    const [service, setService] = useState(null);

    useEffect(() => {
        // Fetch or load the service content dynamically based on serviceId
        if (serviceId) {
            setService(serviceId); // Replace with actual API fetch if needed
        }
    }, [serviceId]);


    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <BreadCrumb />
            <ServiceDetail serviceId={service} />
            <FooterBar />
            <FooterMain />
        </>
    );
}
