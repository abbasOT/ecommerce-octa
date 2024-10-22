"use client"

import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { AboutUsMainStyles, ServiceDetailStyles, WhyChooseUsStyles, HeaderBarStyles, } from '@/components/Ui/Styles/Styles'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Facebook from "../../Ui/Assets/Header/Facebook.svg"
import Image from 'next/image';

function CompanyDetail({ companyDetailTitle }) {
    const isMobile = useMediaQuery('(max-width:600px)');

    const companyData = services.find(group => group.id === companyDetailTitle);

    if (!companyData) {
        return <Typography variant="h6" sx={{ textAlign: "center", padding: "2rem" }}>Loading....</Typography>;
    }
    return (
        <>
            <Box sx={AboutUsMainStyles.containerBox}>
                <Box sx={ServiceDetailStyles.firstTypoBox}>
                    <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...AboutUsMainStyles.firstTypoTitle }}>
                        CircuitHub: {companyData.title}
                    </Typography>
                    <Typography sx={AboutUsMainStyles.subTitleTypo}>
                        {companyData.description}
                    </Typography>
                </Box>

                {companyData.importantPoints.map((service, index) => (
                    <Box key={index} sx={ServiceDetailStyles.typoBoxWidth}>
                        <ul style={ServiceDetailStyles.titlePadding}>
                            <li>
                                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...AboutUsMainStyles.firstTypoTitle, ...AboutUsMainStyles.secondTypoTitle, ...ServiceDetailStyles.headingStyle }}>
                                    {service.title}
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant="body1" sx={{ ...AboutUsMainStyles.subTitleTypo, ...ServiceDetailStyles.typoMargin }}>
                            {service.description}
                        </Typography>
                    </Box>
                ))}
                <Box sx={ServiceDetailStyles.typoBoxWidth}>
                    <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...AboutUsMainStyles.firstTypoTitle, ...AboutUsMainStyles.secondTypoTitle, pb: 0 }} >
                        Join Us
                    </Typography>
                    <Typography variant="body1" sx={{ ...AboutUsMainStyles.subTitleTypo, ...ServiceDetailStyles.typoMargin }}>
                        Looking for a company that values innovation, delivers quality, and fosters collaboration? Join CircuitHub and take your potential to the next level. Explore new opportunities with cutting-edge electronic solutions.
                    </Typography>
                </Box>
                <Box sx={{ ...ServiceDetailStyles.typoBoxWidth, ...ServiceDetailStyles.iconBox }}>

                    <Box sx={{ ...HeaderBarStyles.socialIconsBox, ...ServiceDetailStyles.paddingIconsValue }}>
                        <a href="https://www.facebook.com/circuithubpk" target="_blank" rel="noopener noreferrer">
                            <Image src={Facebook} width={isMobile ? 24 : 32} alt="Facebook" />
                        </a>
                        <a href="https://www.linkedin.com/company/circuit-hub" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon sx={{ ...HeaderBarStyles.iconColor, ...ServiceDetailStyles.iconSize }} />
                        </a>
                        {/* <InstagramIcon sx={{ ...HeaderBarStyles.iconColor, ...ServiceDetailStyles.iconSize }} />
                        <TwitterIcon sx={{ ...HeaderBarStyles.iconColor, ...ServiceDetailStyles.iconSize }} /> */}
                    </Box>
                </Box>

            </Box>


        </>
    )
}

export default CompanyDetail


const services = [
    {
        id: "privacy-policy",
        title: "Privacy Policy",
        description: "At CircuitHub, your privacy is paramount. We are committed to safeguarding your personal information while providing top-notch electronics. Our privacy policy outlines how we collect, use, and protect your data. We ensure transparency and control over your information, adhering to the highest standards of privacy and security.",
        importantPoints: [
            {
                title: 'Data Collection and Use',
                description:
                    'We collect personal data to enhance your shopping experience and provide relevant product recommendations. Your information is used solely for processing orders, customer support, and improving our services. We do not share your data with third parties without your consent, ensuring your privacy and trust.',
            },
            {
                title: 'Security Measures',
                description:
                    'CircuitHub employs advanced security measures to protect your personal data. We use encryption and secure servers to safeguard information from unauthorized access. Our commitment to security ensures that your data remains safe and confidential throughout your interaction with us.',
            },
            {
                title: 'Your Rights and Choices',
                description:
                    'You have the right to access, update, and delete your personal information at any time. Our privacy policy provides clear instructions on how to exercise these rights. We are dedicated to transparency and ensuring you have control over your data while using our services.',
            },
        ],
    },
    {
        id: "terms-conditions",
        title: "Terms & Conditions",
        description: "CircuitHub's terms and conditions outline the rules and guidelines for using our services and products. We emphasize the importance of understanding these terms to ensure a smooth and transparent experience. Our policies cover everything from order placement to returns and customer service.",
        importantPoints: [
            {
                title: 'Order Placement and Payment',
                description:
                    'When placing an order with CircuitHub, you agree to provide accurate information and make timely payments. Our terms outline the process for order confirmation, payment methods, and billing procedures. We aim to provide a seamless ordering experience with clear guidelines for all transactions.',
            },
            {
                title: 'Shipping and Delivery',
                description:
                    'Our terms detail the shipping and delivery process, including estimated delivery times and shipping costs. We strive to ensure prompt and reliable delivery of your orders. Any issues or delays will be communicated, and we work to resolve them swiftly to meet your expectations.',
            },
            {
                title: 'Returns and Exchanges',
                description:
                    'Our returns and exchanges policy allows you to return or exchange products within a specified period. The terms cover conditions for returns, required documentation, and refund processes. We aim to provide a fair and efficient resolution for any issues with your purchases.',
            },
        ],
    },
    {
        id: "returns-policy",
        title: "Return Policy",
        description: "Our returns policy ensures a straightforward process for returning products. CircuitHub prioritizes customer satisfaction by offering clear guidelines on returns and exchanges. We handle returns efficiently and fairly, aiming to resolve any issues with your purchases promptly and professionally.",
        importantPoints: [
            {
                title: 'Eligibility for Returns',
                description:
                    'To be eligible for a return, products must be in their original condition and packaging. Returns are accepted within a specified period from the date of purchase. We provide clear guidelines on eligible products and the process for initiating a return to ensure a smooth experience.',
            },
            {
                title: 'Return Process',
                description:
                    'Initiating a return involves completing a return request and providing necessary details. Our returns policy outlines the steps for submitting a return request, including required documentation and shipping instructions. We aim to process returns quickly and efficiently, ensuring customer satisfaction.',
            },
            {
                title: 'Refunds and Exchanges',
                description:
                    'Refunds or exchanges will be processed once the returned product is received and inspected. We issue refunds to the original payment method or offer exchanges based on availability. Our policy ensures that you receive prompt and fair resolutions to any issues with your purchases.',
            },
        ],
    },


];
