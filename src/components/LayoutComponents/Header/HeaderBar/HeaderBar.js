"use client"
import React from 'react'
import { Box, Button } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import Facebook from "../../../Ui/Assets/Header/Facebook.svg"
import Image from 'next/image';
import { HeaderBarStyles } from '@/components/Ui/Styles/Styles';

function HeaderBar() {
    return (
        <Box sx={HeaderBarStyles.containerBox}>
            <Box sx={HeaderBarStyles.socialIconsBox}>
                <Image src={Facebook} />
                <InstagramIcon sx={HeaderBarStyles.iconColor} />
                <TwitterIcon sx={HeaderBarStyles.iconColor} />
                <LinkedInIcon sx={HeaderBarStyles.iconColor} />
            </Box>
            <Box sx={HeaderBarStyles.buttonsBox}>
                <Button variant="text" sx={HeaderBarStyles.buttonStyle}>
                    <MailOutlineIcon />
                    <span className="buttonText">Info@example.com</span>
                </Button>
                <Button variant="text" sx={HeaderBarStyles.buttonStyle}>
                    <AddIcCallIcon />
                    <span className="buttonText">(303) 555-0105</span>
                </Button>
            </Box>
        </Box>
    )
}

export default HeaderBar
