"use client"
import React from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';

import Typography from '@mui/material/Typography';
import AboutUsImg from "../../Ui/Assets/About/AboutUsImage.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { WhyChooseUsStyles, HappyCustomersStyles, DisplayProductsStyles, AboutUsCardStyles } from '@/components/Ui/Styles/Styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AboutUsCard() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const router = useRouter();
    const handleShopNow = () => {
        router.push("/shop")
    }

    return (
        <Box sx={AboutUsCardStyles.containerBox}>
            <Box sx={AboutUsCardStyles.imgBox}>
                <Image src={AboutUsImg} width={isMobile ? 300 : 550}></Image>
            </Box>
            <Box sx={AboutUsCardStyles.detailsBox}>
                <Typography sx={{ ...HappyCustomersStyles.HappyCustomerName, ...AboutUsCardStyles.title }}>
                    Empowering Every Project, Big or Small
                </Typography>
                <Typography sx={AboutUsCardStyles.subTitle}>
                    More than just a store, Node is your partner in innovation. Let&apos;s make your ideas take flight!
                </Typography>
                <Box sx={AboutUsCardStyles.buttonBox} >
                    <Button variant='text' sx={{ ...DisplayProductsStyles.viewAllButton, ...AboutUsCardStyles.shopNowButton }} onClick={handleShopNow} >
                        Shop Now
                        <ArrowForwardIcon sx={{ width: "1.2rem" }} />
                    </Button>
                </Box>
            </Box>
        </ Box >
    );
}



