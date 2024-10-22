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
                <a href="https://www.facebook.com/circuithubpk" target="_blank" rel="noopener noreferrer">
                    <Image src={Facebook} alt="Facebook" />
                </a>
                <a href="https://www.linkedin.com/company/circuit-hub" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon sx={HeaderBarStyles.iconColor} />
                </a>
                {/* <InstagramIcon sx={HeaderBarStyles.iconColor} /> */}
                {/* <TwitterIcon sx={HeaderBarStyles.iconColor} /> */}
            </Box>
            <Box sx={HeaderBarStyles.buttonsBox}>
                <Button variant="text" sx={HeaderBarStyles.buttonStyle} onClick={() => window.location.href = 'mailto:sales@circuithub.com'}>
                    <MailOutlineIcon />
                    <span className="buttonText">sales@circuithub.com</span>
                </Button>
                <Button variant="text" sx={HeaderBarStyles.buttonStyle} onClick={() => window.location.href = 'tel:+92518773179'}>
                    <AddIcCallIcon />
                    <span className="buttonText">051 877 3179</span>
                </Button>
            </Box>
        </Box>
    )
}

export default HeaderBar
