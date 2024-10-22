"use client"
import React, { useEffect, useState } from 'react'

import { Grid, Box, Typography, Button, TextField, InputAdornment, List, ListItem, useMediaQuery, CircularProgress } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { FooterMainStyles, RegistrationStyles } from '@/components/Ui/Styles/Styles';
import Logo from "../../../Ui/Assets/Registration/circuitHubLogoBlue.svg"
import Image from 'next/image';
import FooterAccordion from './FooterAccordion';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { setSelectedCategory, setSelectedCategoryWithProducts, fetchCategories } from '@/redux/slices/categoriesSlice';
import medusa from '@/medusaClient';
import { searchValues } from '@/redux/slices/searchBar';


function FooterMain() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.product.allProducts);
    const router = useRouter();
    const categories = useSelector((state) => state.categories.allCategories);
    const categoriesWithProducts = useSelector((state) => state.categories.allCategoriesWithProducts);

    const parentCategories = categories.filter(category => !category.parent_category_id);

    useEffect(() => {
        dispatch(fetchCategories(medusa));
    }, [dispatch, medusa]);

    const handleCategoryClick = (categoryName) => {

        console.log("inside the category click footer")
        // Redirect to shop page with selected category ID
        dispatch(searchValues({ searchQuery: "" }));
        dispatch(setSelectedCategory(categoryName));
        // Find all products that belong to the selected category
        let productsInCategory = [];
        // Iterate through categoriesWithProducts to find the selected category
        categoriesWithProducts.forEach(item => {
            if (item.product_category.name === categoryName && item.product) {
                // Check if the product exists in the allProducts array
                const productExistsInAllProducts = allProducts.some(product => product.id === item.product.id);

                if (productExistsInAllProducts) {
                    // Concatenate only products that exist in allProducts array
                    productsInCategory = productsInCategory.concat(item.product);
                }
            }
        });
        // Dispatch action to store products in Redux state
        dispatch(setSelectedCategoryWithProducts(productsInCategory));
        router.push(`/shop`);

    };

    const usefulLinks = [
        { label: 'Home', route: '/' },
        { label: 'Contact Us', route: '/contact' },
        { label: 'About Us', route: '/about' },
        { label: 'Privacy Policy', route: '/our/privacy-policy' },
        { label: 'Terms & Conditions', route: '/our/terms-conditions' },
        { label: 'Returns', route: '/our/returns-policy' },
    ];

    // Function to handle routing based on the clicked item
    const handleClickRoute = (route) => {
        router.push(route);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (values.email === "") {
                // alert("Email field is required")
                Swal.fire({
                    title: 'Error!',
                    text: 'Email field is required',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return
            }
            try {
                setLoading(true);
                const response = await fetch("/api/subscriptionemail/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": 'text/plain',
                    },
                    body: JSON.stringify({
                        email: values.email
                    }),
                });

                if (response.ok) {
                    console.log("Email sent successfully");
                    Swal.fire({
                        title: 'Success!',
                        text: 'Email sent successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    // alert("Email sent successfully")
                    resetForm(); // Reset the form fields to initial values
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error:", error);
                // alert("Error sending email")
                Swal.fire({
                    title: 'Error!',
                    text: 'Error sending email',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setLoading(false);
            }
        },
    });
    return (
        <Box sx={FooterMainStyles.containerBox}>
            <Grid container spacing={1} paddingTop={"2.5rem"}>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={FooterMainStyles.firstGrid}>
                    <Box sx={FooterMainStyles.firstGridInnerBox}>
                        <Image src={Logo} width={150} style={{ cursor: "pointer" }} onClick={() => handleClickRoute("/")} />
                        <Typography sx={FooterMainStyles.firstDescription}>
                            We are a premier electronics store based in Pakistan, offering a wide range of high-quality tech products and accessories.
                        </Typography>
                        <Typography sx={FooterMainStyles.headingTypo}>
                            Newsletter
                        </Typography>
                        <Typography sx={{ ...FooterMainStyles.firstDescription, ...FooterMainStyles.secondDescription }}>
                            Be the first one to know about discounts, offers and events. <br></br> Unsubscribe whenever you like.
                        </Typography>
                        <Box sx={FooterMainStyles.textFieldBox}>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    sx={FooterMainStyles.textFieldStyle}
                                    id="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    autoComplete="off"
                                    {...formik.getFieldProps("email")}
                                    inputProps={{ maxLength: 50 }}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">  <Button variant="contained" sx={FooterMainStyles.buttonStyle} disabled={loading} type='submit'>
                                                {loading ? <CircularProgress size={24} sx={{ color: "#FFF" }} /> : "Submit"}</Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div style={RegistrationStyles.requiredStyle}>{formik.errors.email}</div>
                                ) : null}
                            </form>
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
                                        {parentCategories.map((category) => (
                                            <React.Fragment key={category.id} >
                                                <ListItem style={{ cursor: "pointer" }} onClick={() => handleCategoryClick(category.name)}>
                                                    {category.name}
                                                </ListItem>
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </Box>


                                <Box>
                                    <Typography sx={FooterMainStyles.listHeadingStyle}>
                                        Useful Links
                                    </Typography>
                                    <List sx={FooterMainStyles.listText}>
                                        {usefulLinks.map((link, index) => (
                                            <ListItem key={index} style={{ cursor: "pointer" }} onClick={() => handleClickRoute(link.route)}  >
                                                {link.label}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </>
                        }
                    </Box>

                </Grid >
            </Grid >
            <Box sx={FooterMainStyles.lastBox}>
                <Typography sx={FooterMainStyles.copyrightsTypo}>
                    Circuithub.pk © Copyright 2020, Inc. All rights reserved
                </Typography>
                <Box sx={FooterMainStyles.socialIconsBox}>
                    <a href="https://www.facebook.com/circuithubpk" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon sx={FooterMainStyles.iconColor} />
                    </a>
                    <PinterestIcon sx={FooterMainStyles.iconColor} />
                    <InstagramIcon sx={FooterMainStyles.iconColor} />
                    <TwitterIcon sx={FooterMainStyles.iconColor} />
                </Box>
            </Box>
        </Box >

    )
}

export default FooterMain
