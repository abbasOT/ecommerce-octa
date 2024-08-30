"use client"

import SignUp from "@/components/RegistrationComponents/SignUp/SignUp";
import HeaderBar from "@/components/LayoutComponents/Header/HeaderBar/HeaderBar";
import FooterMain from "@/components/LayoutComponents/Footer/FooterMain/FooterMain";

export default function SignUpPage() {
    return (
        <div style={{ background: "#F8FAFC" }}>
            <HeaderBar />
            <SignUp />
            <FooterMain />
        </div>
    );
}
