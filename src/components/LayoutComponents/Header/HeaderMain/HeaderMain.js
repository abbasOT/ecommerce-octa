"use client"
import React, { useState, useEffect } from 'react';
import { Grid, Box, TextField, InputAdornment, Button, Menu, MenuItem, useMediaQuery } from '@mui/material';
import MyAccount from "../../../Ui/Assets/Header/Account.svg"
import ShoppingCart from "../../../Ui/Assets/Header/Shopping-cart.svg"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { persistor } from '../../../../redux/store'; // Import the persistor
import Logo from "@/components/Ui/Assets/Registration/circuitHubLogoBlue.svg";
import Swal from 'sweetalert2';
import { FooterMainStyles, HeaderBarStyles, HeaderMainStyles } from '@/components/Ui/Styles/Styles';
import { setSelectedCategory, setSelectedCategoryWithProducts } from '@/redux/slices/categoriesSlice';


import { useDispatch, useSelector } from 'react-redux';
import { searchValue, searchValues } from '@/redux/slices/searchBar';
import medusa from '@/medusaClient';  // Adjust the import path as necessary
import { customer_id } from '@/redux/slices/medusaConfig';
function HeaderMain() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch()
    const router = useRouter();
    const cartProducts = useSelector((state) => state.product.cart);
    const searchQuery = useSelector((state) => state.searchBar.searchQuery);
    // const [inputValue, setInputValue] = useState(searchQuery);
    const inputValue = useSelector((state) => state.searchBar.searchValue);
    // const customerId = useSelector((state => state.medusaConfig.customer_id))
    const customerIdFromStore = useSelector((state) => state.medusaConfig.customer_id);
    const [customerId, setCustomerId] = useState(null);

    // const medusa = useSelector((state => state.medusaConfig.medusa))

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const productCount = cartProducts.reduce((total, product) => total + product.quantity, 0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCustomerId(customerIdFromStore || ""); // Use customerId from Redux store
        }
    }, [customerIdFromStore]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleInputChange = (event) => {
        const value = event.target.value; // Update local state to reflect the input
        dispatch(searchValue({ searchValue: value }));
    };

    const handleSearchChange = (event) => {
        if (event.key === 'Enter') {
            const query = event.target.value; // Remove any extra spaces
            if (query) {
                dispatch(searchValues({ searchQuery: query }));
                dispatch(setSelectedCategory(""));
                dispatch(setSelectedCategoryWithProducts(""));
                router.push('/shop');
            }
        }
    };


    const handleAccount = () => {
        router.push('/my-account/OrderHistory');
    }

    const handleHomeclick = () => {
        router.push('/');
    }

    const handleAddToCart = () => {
        router.push('/add-to-cart');
    }

    const handleLogOut = async () => {
        if (typeof window !== 'undefined') {
            if (customerId === "") {
                // Navigate to login if customerId is empty
                localStorage.clear();
                sessionStorage.clear();
                router.push('/login');
            } else {

                try {
                    // Proceed with Medusa logout
                    await medusa.auth.deleteSession();

                    // Clear storage and Redux state
                    localStorage.clear();
                    sessionStorage.clear();

                    // Clear Redux persisted state
                    // await persistor.flush();  
                    // await persistor.purge();  

                    // dispatch(customer_id("")); 
                    dispatch({ type: 'USER_LOGOUT' }); // Trigger full state reset

                    // Show success message and redirect to login
                    Swal.fire({
                        title: 'Logged out!',
                        text: 'You have been logged out successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        dispatch(customer_id(""));
                        router.push('/login');
                    });
                } catch (error) {
                    // Log any errors and show failure message
                    console.error('Error logging out:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to log out. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        }
    };

    return (
        <Box sx={{ ...FooterMainStyles.containerBox, ...HeaderMainStyles.containerBox }}>
            <Grid container spacing={1} >
                <Grid item xs={12} sm={12} md={6} lg={4} sx={FooterMainStyles.firstGrid}>
                    <Image src={Logo} width={160} style={{ cursor: "pointer" }} onClick={handleHomeclick} alt="Logo" />
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
                            value={inputValue} // Use the local state to reflect the input value
                            onChange={handleInputChange}
                            onKeyDown={handleSearchChange}
                            inputProps={{ maxLength: 50 }}
                            fullWidth

                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={4} sx={{ ...FooterMainStyles.firstGrid, ...HeaderMainStyles.buttonsGrid }}>

                    <Button variant="text" sx={{ ...HeaderBarStyles.buttonStyle, ...HeaderMainStyles.iconButtonStyle }} onClick={handleAccount}>
                        <Image src={MyAccount} width={isMobile ? 20 : 30} alt="My Account Logo" />
                        My Account
                    </Button>
                    <Button variant="text" sx={{ ...HeaderBarStyles.buttonStyle, ...HeaderMainStyles.iconButtonStyle }} onClick={handleAddToCart}>
                        <Image src={ShoppingCart} width={isMobile ? 20 : 30} alt="Shopping Cart Logo" />
                        <Box sx={HeaderMainStyles.cartCountBox}>{productCount}</Box>
                        Cart
                    </Button>
                    <Button variant="contained" sx={{ ...FooterMainStyles.buttonStyle, ...HeaderMainStyles.logoutButton }} onClick={handleLogOut}>
                        {(customerId === "" || !customerId) ? "Sign in" : "Log out"}
                    </Button>
                </Grid>

            </Grid>
        </Box>
    );
}

export default HeaderMain;










// InputProps={{
//     endAdornment: (
//         <InputAdornment position="end">
//             <Button
//                 id="basic-button"
//                 aria-controls={open ? 'basic-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//                 onClick={handleClick}
//                 variant="contained"
//                 sx={{ ...FooterMainStyles.buttonStyle, ...HeaderMainStyles.buttonStyle }}
//                 endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             >
//                 Categories
//             </Button>
//             <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 MenuListProps={{
//                     'aria-labelledby': 'basic-button',
//                 }}
//             >
//                 <MenuItem onClick={handleClose}>Accessories</MenuItem>
//                 <MenuItem onClick={handleClose}>Connectivity</MenuItem>
//                 <MenuItem onClick={handleClose}>Resistors</MenuItem>
//             </Menu>
//         </InputAdornment>
//     ),
// }}