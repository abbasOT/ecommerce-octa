"use client"

import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { AboutUsMainStyles, ServiceDetailStyles, WhyChooseUsStyles, HeaderBarStyles, } from '@/components/Ui/Styles/Styles'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Facebook from "../../Ui/Assets/Header/Facebook.svg"
import Image from 'next/image';

function ServiceDetail() {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <>
            <Box sx={AboutUsMainStyles.containerBox}>
                <Box sx={ServiceDetailStyles.firstTypoBox}>
                    <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...AboutUsMainStyles.firstTypoTitle }}>
                        Node: Your Partner in Success
                    </Typography>
                    <Typography sx={AboutUsMainStyles.subTitleTypo}>
                        At Node, we&apos;re dedicated to exceptional customer service, superior products, and pioneering solutions that empower our clients to achieve their goals. At Node, we specialize in crafting custom solutions that bring your unique ideas to life. We partner with you every step of the way, from brainstorming to final product testing and support.
                    </Typography>
                </Box>
                {serviceData.map((service) => (
                    <Box key={service.title} sx={ServiceDetailStyles.typoBoxWidth}>
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
                        Are you looking for a company that prioritizes innovation, champions quality, and embraces a fun and collaborative work environment? Contact Node today and discover how we can help you reach your full potential.
                    </Typography>
                </Box>
                <Box sx={{ ...ServiceDetailStyles.typoBoxWidth, ...ServiceDetailStyles.iconBox }}>

                    <Box sx={{ ...HeaderBarStyles.socialIconsBox, ...ServiceDetailStyles.paddingIconsValue }}>
                        <Image src={Facebook} width={isMobile ? 24 : 32} />
                        <InstagramIcon sx={{ ...HeaderBarStyles.iconColor, ...ServiceDetailStyles.iconSize }} />
                        <TwitterIcon sx={{ ...HeaderBarStyles.iconColor, ...ServiceDetailStyles.iconSize }} />
                        <LinkedInIcon sx={{ ...HeaderBarStyles.iconColor, ...ServiceDetailStyles.iconSize }} />
                    </Box>
                </Box>

            </Box>


        </>
    )
}

export default ServiceDetail

const serviceData = [
    {
        title: 'Unwavering Commitment to Quality',
        description:
            'Our team of passionate engineers boasts cutting-edge expertise and a dedication to exceptional service. We leverage innovation to deliver a comprehensive range of reliable embedded systems—ensuring consistent value and a strong return on your investment. Nationwide delivery keeps your project on track, wherever you are.',
    },
    {
        title: 'Beyond Repairs: Reimagineering the Possible',
        description:
            'Node tackles even the most complex challenges. Our engineers are equipped to not only diagnose and fix existing electronics, but also optimize, reverse-engineer, and duplicate systems with specific modifications. We\'ll explore alternative solutions tailored to your unique situation.',
    },
    {
        title: 'Innovation at Your Service',
        description:
            'Our team thrives on finding ingenious solutions that perfectly align with your needs. We go beyond simply fixing problems—we strive to deliver the best possible outcome, exceeding your expectations and ensuring complete satisfaction.',
    },
];
