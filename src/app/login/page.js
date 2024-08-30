"use client"

import LogIn from "@/components/RegistrationComponents/LogIn/LogIn";
import HeaderBar from "@/components/LayoutComponents/Header/HeaderBar/HeaderBar";
import FooterMain from "@/components/LayoutComponents/Footer/FooterMain/FooterMain";



export default function LogInPage() {
    return (
        <div style={{ background: "#F8FAFC" }}>
            <HeaderBar />
            <LogIn />
            <FooterMain />
        </div>
    );
}
