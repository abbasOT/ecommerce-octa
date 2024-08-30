"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Grid, Box, TextField, InputAdornment, Button, Menu, MenuItem, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MyAccount from "../../../Ui/Assets/Header/Account.svg"
import ShoppingCart from "../../../Ui/Assets/Header/Shopping-cart.svg"
import Image from 'next/image';
import Medusa from "@medusajs/medusa-js"
import { useRouter } from 'next/navigation';
import { FooterMainStyles, HeaderBarStyles, HeaderMainStyles } from '@/components/Ui/Styles/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { searchValues } from '@/redux/slices/searchBar';
import Logo from '@/components/Ui/Assets/Registration/NodeLogo.svg';  // Adjust the import path as necessary
import medusa from '@/medusaClient';  // Adjust the import path as necessary
function HeaderMain() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch()
    const router = useRouter();
    const cartProducts = useSelector((state) => state.product.cart);
    const searchQuery = useSelector((state) => state.searchBar.searchQuery);
    const customerId = useSelector((state => state.medusaConfig.customer_id))
    // const medusa = useSelector((state => state.medusaConfig.medusa))

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const productCount = cartProducts.reduce((total, product) => total + product.quantity, 0);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        dispatch(searchValues({ searchQuery: query }));

    };

    const handleAccount = () => {
        router.push('/my-account');
    }

    const handleLogOut = () => {
        if (typeof window !== 'undefined') {
            if (customerId === "") {
                // If customerId is empty, just navigate to login
                localStorage.clear();
                router.push('/login');
            } else {
                // If customerId is not empty, proceed with Medusa logout
                medusa.auth.deleteSession()
                    .then(() => {
                        alert("logged out successfully!");
                        localStorage.clear();
                        router.push('/login');
                    })
                    .catch((error) => {
                        console.error('Error logging out:', error);
                        alert("Failed to log out. Please try again.");
                    });
            }
        }
    }


    return (
        <Box sx={{ ...FooterMainStyles.containerBox, ...HeaderMainStyles.containerBox }}>
            <Grid container spacing={1} >
                <Grid item xs={12} sm={12} md={6} lg={4} sx={FooterMainStyles.firstGrid}>
                    <Image src={Logo} width={120} alt="Logo" />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} sx={FooterMainStyles.firstGrid}>
                    <Box sx={FooterMainStyles.textFieldBox}>
                        <TextField
                            sx={HeaderMainStyles.searchField}
                            id="email"
                            placeholder="Search"
                            name="text"
                            type="text"
                            variant="outlined"
                            autoComplete="off"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            inputProps={{ maxLength: 50 }}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            variant="contained"
                                            sx={{ ...FooterMainStyles.buttonStyle, ...HeaderMainStyles.buttonStyle }}
                                            endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        >
                                            Categories
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>Accessories</MenuItem>
                                            <MenuItem onClick={handleClose}>Connectivity</MenuItem>
                                            <MenuItem onClick={handleClose}>Resistors</MenuItem>
                                        </Menu>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={4} sx={{ ...FooterMainStyles.firstGrid, ...HeaderMainStyles.buttonsGrid }}>

                    <Button variant="text" sx={{ ...HeaderBarStyles.buttonStyle, ...HeaderMainStyles.iconButtonStyle }} onClick={handleAccount}>
                        <Image src={MyAccount} width={isMobile ? 20 : 30} alt="My Account Logo" />
                        My Account
                    </Button>
                    <Link href="/add-to-cart">
                        <Button variant="text" sx={{ ...HeaderBarStyles.buttonStyle, ...HeaderMainStyles.iconButtonStyle }}>
                            <Image src={ShoppingCart} width={isMobile ? 20 : 30} alt="Shopping Cart Logo" />
                            <Box sx={HeaderMainStyles.cartCountBox}>{productCount}</Box>
                            Cart
                        </Button>
                    </Link>
                    <Button variant="contained" sx={{ ...FooterMainStyles.buttonStyle, ...HeaderMainStyles.logoutButton }} onClick={handleLogOut}>
                        {customerId === "" ? "Sign in" : "Log out"}
                    </Button>
                </Grid>

            </Grid>
        </Box>
    );
}

export default HeaderMain;
