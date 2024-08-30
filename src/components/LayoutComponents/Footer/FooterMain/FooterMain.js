"use client"
import React from 'react'

import { Grid, Box, Typography, Button, TextField, InputAdornment, List, ListItem, useMediaQuery } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { FooterMainStyles } from '@/components/Ui/Styles/Styles';
import Logo from "../../../Ui/Assets/Registration/NodeLogo.svg"
import Image from 'next/image';
import FooterAccordion from './FooterAccordion';

function FooterMain() {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <Box sx={FooterMainStyles.containerBox}>
            <Grid container spacing={1} paddingTop={"2.5rem"}>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={FooterMainStyles.firstGrid}>
                    <Box sx={FooterMainStyles.firstGridInnerBox}>
                        <Image src={Logo} width={120} />
                        <Typography sx={FooterMainStyles.firstDescription}>
                            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
                        </Typography>
                        <Typography sx={FooterMainStyles.headingTypo}>
                            Newsletter
                        </Typography>
                        <Typography sx={{ ...FooterMainStyles.firstDescription, ...FooterMainStyles.secondDescription }}>
                            Be the first one to know about discounts, offers and events. Unsubscribe whenever you like.
                        </Typography>
                        <Box sx={FooterMainStyles.textFieldBox}>
                            <TextField
                                sx={FooterMainStyles.textFieldStyle}
                                id="email"
                                placeholder="Enter your email"
                                name="email"
                                type="email"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 50 }}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">  <Button variant="contained" sx={FooterMainStyles.buttonStyle} >Submit </Button>  </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Box>


                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}   >


                    <Box sx={FooterMainStyles.secondGridInnerBox}>
                        {isMobile ? <FooterAccordion /> :
                            <>
                                <Box >
                                    <Typography sx={FooterMainStyles.listHeadingStyle}>
                                        Categories
                                    </Typography>
                                    <List sx={FooterMainStyles.listText}>
                                        <ListItem>Discrete electronic Components</ListItem>
                                        <ListItem>Modules & Breakout Boards</ListItem>
                                        <ListItem>Connectivity</ListItem>
                                        <ListItem>Motors & Drivers</ListItem>
                                        <ListItem>Resistors</ListItem>
                                        <ListItem>Robotics & Machines</ListItem>
                                    </List>
                                </Box>


                                <Box>
                                    <Typography sx={FooterMainStyles.listHeadingStyle}>
                                        Useful Links
                                    </Typography>
                                    <List sx={FooterMainStyles.listText}>
                                        <ListItem>Home</ListItem>
                                        <ListItem>Contact Us</ListItem>
                                        <ListItem>About Us</ListItem>
                                        <ListItem>Privacy Policy</ListItem>
                                        <ListItem>Terms & Condition</ListItem>
                                        <ListItem>Returns</ListItem>
                                    </List>
                                </Box>
                            </>
                        }
                    </Box>

                </Grid >
            </Grid >
            <Box sx={FooterMainStyles.lastBox}>
                <Typography sx={FooterMainStyles.copyrightsTypo}>
                    Node © Copyright 2020, Inc. All rights reserved
                </Typography>
                <Box sx={FooterMainStyles.socialIconsBox}>
                    <FacebookIcon sx={FooterMainStyles.iconColor} />
                    <InstagramIcon sx={FooterMainStyles.iconColor} />
                    <TwitterIcon sx={FooterMainStyles.iconColor} />
                    <PinterestIcon sx={FooterMainStyles.iconColor} />
                </Box>
            </Box>
        </Box >

    )
}

export default FooterMain
