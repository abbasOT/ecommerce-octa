"use client"

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import RandD from "../../Ui/Assets/Home/RandD.svg"
import ElectronicsProjects from "../../Ui/Assets/Home/ElectronicsProjects.svg"
import PCB from "../../Ui/Assets/Home/PCBDesign.svg"
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { WhyChooseUsStyles, RegistrationStyles, DeliveryHoursStyles, ServiceCardStyles } from '@/components/Ui/Styles/Styles';
import { useRouter } from 'next/navigation';


const Data = [
    { id: 1, icon: RandD, title: "R&D", text: "R & D Based Customize Projects" },
    { id: 2, icon: ElectronicsProjects, title: "Electronics Projects", text: "Product Designing (From Concept to Reality)" },
    { id: 3, icon: PCB, title: "PCB Design", text: "Manufacturing Fabrication" }
];

function ServiceCard() {
    const router = useRouter(); // Initialize useRouter

    const handleCardClick = (id) => {
        router.push(`/service/${id}`); // Navigate to the service detail page with the ID
    };

    return (
        <Box sx={WhyChooseUsStyles.containerBox}>
            {Data.map((item) => (
                <Box key={item.id} sx={{ ...ServiceCardStyles.containerBox, cursor: "pointer" }} onClick={() => handleCardClick(item.id)}  >
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




