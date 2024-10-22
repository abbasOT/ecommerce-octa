"use client"

import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { AboutUsMainStyles, ServiceDetailStyles, WhyChooseUsStyles, HeaderBarStyles, } from '@/components/Ui/Styles/Styles'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Facebook from "../../Ui/Assets/Header/Facebook.svg"
import Image from 'next/image';

function ServiceDetail({ serviceId }) {
    const isMobile = useMediaQuery('(max-width:600px)');

    const serviceGroup = services.find(group => group.id === serviceId);

    if (!serviceGroup) {
        return <Typography variant="h6" sx={{ textAlign: "center", padding: "2rem" }}>Service not found</Typography>;
    }
    return (
        <>
            <Box sx={AboutUsMainStyles.containerBox}>
                <Box sx={ServiceDetailStyles.firstTypoBox}>
                    <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...AboutUsMainStyles.firstTypoTitle }}>
                        CircuitHub: Your Partner in Success
                    </Typography>
                    <Typography sx={AboutUsMainStyles.subTitleTypo}>
                        At Circuithub.pk, we&apos;re dedicated to exceptional customer service, superior products, and pioneering solutions that empower our clients to achieve their goals. At circuithub.pk, we specialize in crafting custom solutions that bring your unique ideas to life. We partner with you every step of the way, from brainstorming to final product testing and support.
                    </Typography>
                </Box>

                {serviceGroup.services.map((service, index) => (
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

export default ServiceDetail


const services = [
    {
        id: "R_and_D",
        services: [
            {
                title: 'Unwavering Commitment to Quality',
                description:
                    'At CircuitHub, we are dedicated to providing top-notch electronic products with unmatched reliability. Our team’s expertise ensures every product meets the highest standards, delivering consistent performance and exceptional value. We offer nationwide delivery to keep your projects running smoothly, no matter where you are.',
            },
            {
                title: 'Innovative Solutions for Complex Electronics',
                description:
                    'CircuitHub excels at tackling intricate electronic challenges. From optimizing existing systems to developing custom solutions, our engineers are equipped to handle a wide range of needs. We focus on innovation to provide tailored solutions that meet your specific requirements.',
            },
            {
                title: 'Leading-Edge Technology and Expertise',
                description:
                    'Our commitment to innovation drives us to offer the latest advancements in electronic systems. We focus on delivering exceptional outcomes by staying ahead of industry trends and ensuring your technology needs are met with cutting-edge solutions.',
            },
        ],
    },
    {
        id: "electronics_projects",
        services: [
            {
                title: 'State-of-the-Art Technology Integration',
                description:
                    'We excel in incorporating the latest technology into your electronic systems. Our engineers specialize in adding advanced features and improvements, ensuring your systems remain at the forefront of performance and functionality.',
            },
            {
                title: 'Customized Solutions for Unique Projects',
                description:
                    'Every project is unique, and so are our solutions. We work closely with you to develop tailored solutions that address your specific needs, delivering results that align perfectly with your project goals.',
            },
            {
                title: 'Thorough System Diagnostics and Analysis',
                description:
                    'Our diagnostic services offer in-depth analysis of your systems to uncover underlying issues and potential enhancements. We provide comprehensive evaluations to ensure your electronic systems operate at their best.',
            },
        ],
    },
    {
        id: "pcb_design",
        services: [
            {
                title: 'Advanced PCB Design and Integration',
                description:
                    'CircuitHub specializes in cutting-edge PCB design and integration. Our expertise ensures that your PCBs incorporate the latest technology and meet your performance requirements, delivering high-quality and reliable designs.',
            },
            {
                title: 'Custom PCB Solutions for Specific Needs',
                description:
                    'We understand that each project has unique needs. Our custom PCB solutions are designed to address your specific requirements, providing tailored designs that perfectly fit your project objectives.',
            },
            {
                title: 'Comprehensive Testing and Validation',
                description:
                    'Our PCB design process includes rigorous testing and validation to ensure reliability and performance. We conduct thorough evaluations to guarantee that every design meets your standards and operates flawlessly.',
            },
        ],
    },

];
