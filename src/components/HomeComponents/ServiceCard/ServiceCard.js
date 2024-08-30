"use client"

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import RandD from "../../Ui/Assets/Home/RandD.svg"
import ElectronicsProjects from "../../Ui/Assets/Home/ElectronicsProjects.svg"
import PCB from "../../Ui/Assets/Home/PCBDesign.svg"
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { WhyChooseUsStyles, RegistrationStyles, DeliveryHoursStyles, ServiceCardStyles } from '@/components/Ui/Styles/Styles';
const Data = [{ icon: RandD, title: "R&D", text: "R & D Based Customize Projects" }, { icon: ElectronicsProjects, title: "Electronics Projects", text: "Product Designing (From Concept to Reality)" },
{ icon: PCB, title: "PCB Design", text: "Manufacturing Fabrication" }];

function ServiceCard() {
    const searchQuery = useSelector((state) => state.searchBar.searchQuery);
    console.log(searchQuery, "the results of search query are...")

    return (
        <Box sx={WhyChooseUsStyles.containerBox}>
            {Data.map((item, index) => (
                <Box key={index} sx={ServiceCardStyles.containerBox}>
                    <Box sx={{ ...RegistrationStyles.formBox, ...ServiceCardStyles.cardBox }}>
                        <Image src={item.icon} />
                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ServiceCardStyles.titleStyle }}>
                            {item.title}
                        </Typography>
                    </Box>
                    <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...DeliveryHoursStyles.DeliveryHoursDescription, ...ServiceCardStyles.descriptionStyle }} >
                        {item.text}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default ServiceCard;




