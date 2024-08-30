"use client"

import React from 'react';
import { Box, Typography } from '@mui/material';
import AboutUsCard from '../AboutUsCard/AboutUsCard';
import { AboutUsMainStyles, WhyChooseUsStyles } from '@/components/Ui/Styles/Styles';

function AboutUsMain() {
    return (
        <Box sx={AboutUsMainStyles.containerBox}>
            <Box sx={AboutUsMainStyles.firstTypoBox}>
                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...AboutUsMainStyles.firstTypoTitle }}>
                    Powering Your Innovation from <br /> Concept  to Creation
                </Typography>
                <Typography sx={AboutUsMainStyles.subTitleTypo} >
                    Node is your one-stop shop for turning your electrical, electronics, robotics, and mechatronics ideas into reality. Founded by passionate engineers, we offer a vast selection of cutting-edge products at competitive prices to suit every vision and skill level, from hobbyists to professional engineers.
                </Typography>
            </Box>

            <AboutUsCard />

            <Box sx={AboutUsMainStyles.secondTypoBox}>
                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...AboutUsMainStyles.firstTypoTitle, ...AboutUsMainStyles.secondTypoTitle }}>
                    Some of Node’s Impressive Services:
                </Typography>
                <Box component="ul" sx={AboutUsMainStyles.listBox}>
                    {services.map((service) => (
                        <li key={service}>
                            <Typography variant="body1" sx={AboutUsMainStyles.subTitleTypo}>
                                {service}
                            </Typography>
                        </li>
                    ))}
                </Box>
            </Box>
            <Box sx={{ ...AboutUsMainStyles.secondTypoBox, ...AboutUsMainStyles.thirdTypoBox }}>
                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...AboutUsMainStyles.firstTypoTitle, ...AboutUsMainStyles.secondTypoTitle, ...AboutUsMainStyles.thirdTypoBox }}>
                    More Than Just Products
                </Typography>
                <Typography sx={AboutUsMainStyles.subTitleTypo} >
                    At Node, we go beyond just supplying parts. We are committed to your project&apos;s success, offering a comprehensive suite of services including:
                </Typography>
                <Box component="ul" sx={{ ...AboutUsMainStyles.listBox, pt: 0 }}>
                    {extendedServices.map((service) => (
                        <li key={service}>
                            <Typography variant="body1" sx={AboutUsMainStyles.subTitleTypo}>
                                {service}
                            </Typography>
                        </li>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default AboutUsMain;



const services = [
    'Unmatched Selection: Explore a comprehensive range of electronic components, modules, and tools to bring your project to life.',
    'Expert Guidance: Our knowledgeable team provides invaluable insights, strategies, and efficient solutions to help you achieve your goals.',
    'Hassle-Free Shopping: Enjoy a smooth shopping experience with great deals and fast delivery to your doorstep.',
    'Seamless Project Completion: We take pride in our exceptional customer service, ensuring every project, regardless of scale or complexity, receives professional attention.',
];

const extendedServices = [
    'Embedded Systems Design',
    'PCB Layout and Fabrication',
    'Electronic Product Prototyping',
    '... and much more!',
];