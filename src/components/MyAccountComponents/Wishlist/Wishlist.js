"use client"

import { ContactFormStyles, FAQsStyles, FooterMainStyles, WhyChooseUsStyles, ProductCardStyles, MyAccountStyles } from '@/components/Ui/Styles/Styles'
import { Typography, Box, Button, IconButton, } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { removeProductFromWishList, addProductToCart } from '../../../redux/slices/productSlice';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

function Wishlist() {

    const dispatch = useDispatch()
    const wishList = useSelector((state) => state.product.wishList);
    const customerId = useSelector((state) => state.medusaConfig.customer_id);
    const allProducts = useSelector((state) => state.product.allProducts);
    const [customerWishList, setCustomerWishList] = useState([])
    console.log(wishList, "redux wishlist")


    useEffect(() => {
        if (customerId) {
            fetchWishList(customerId);
        }
    }, [customerId]);

    const fetchWishList = async (customerId) => {
        try {
            const response = await fetch(`/api/wishlist/read?customer_id=${customerId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wishlist');
            }
            const data = await response.json();
            setCustomerWishList(data.wishList);
        } catch (error) {
            console.error('Error fetching wishlist:', error);

        }
    };

    console.log(customerWishList, "customerWishList");

    // Find the matched products
    const matchedProducts = customerId === ""
        ? wishList
        : customerWishList.map(wishlistItem => {
            const matchingProduct = allProducts.find(product => product.id === wishlistItem.product_id);
            return matchingProduct;
        }).filter(product => product !== undefined);

    console.log(matchedProducts, "products to show on wishlist");



    const handleRemoveFromWishList = async (productId) => {
        if (customerId === "") {
            // Directly remove from Redux if there's no customerId
            dispatch(removeProductFromWishList(productId));
        } else {
            try {
                // Call the API to remove from the database if there's a customerId
                const response = await fetch('/api/wishlist/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: productId, customerId: customerId }), // Include customerId in the request
                });

                if (response.ok) {
                    // Successfully removed from database, now update Redux
                    dispatch(removeProductFromWishList(productId));
                    setCustomerWishList(prev => prev.filter(item => item.product_id !== productId));
                } else {
                    console.error('Failed to delete wishlist item from database');
                }
            } catch (error) {
                console.error('Error deleting wishlist item:', error);
                // Fallback to updating Redux even if API call fails
                dispatch(removeProductFromWishList(productId));
            }
        }
    };


    const handleAddtoCart = (product) => {
        dispatch(addProductToCart(product));
        dispatch(removeProductFromWishList(product.id));
    };



    return (
        <Box sx={MyAccountStyles.containerBox}>
            <Typography sx={{ ...FAQsStyles.title, ...MyAccountStyles.headingTypo }}>Wishlist</Typography>
            {matchedProducts?.map((product, index) => (
                <Box key={index} sx={{ ...FooterMainStyles.firstGrid, ...MyAccountStyles.contentBox }}>
                    <Box sx={MyAccountStyles.firstBox}>
                        <Box>
                            {/* <Image src={order.imgPath} /> */}
                            <img src={product?.thumbnail} width={80} />

                        </Box>
                        <Box sx={MyAccountStyles.typoBox}>
                            <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont }}>
                                {product?.title}
                            </Typography>
                            <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...MyAccountStyles.typoFontSize, color: "#5C5F6A" }}>
                                Added on: 27 July 2023
                            </Typography>
                            <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont, ...MyAccountStyles.typoFontSize }}>
                                In stock
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={MyAccountStyles.secondBoxWishlist}>
                        <Typography sx={MyAccountStyles.orderPriceTypo}>
                            ${product?.variants[0].prices[0].amount / 100}
                        </Typography>
                        <Box sx={{ ...ContactFormStyles.buttonBox, ...MyAccountStyles.buttonBox }} >
                            <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, ...MyAccountStyles.viewItemButton }} onClick={() => handleAddtoCart(product)}>Add to cart</Button>
                        </Box>
                        <Box sx={{ ...ContactFormStyles.buttonBox, ...MyAccountStyles.buttonBox }} >
                            <IconButton aria-label="delete" size="large" onClick={() => handleRemoveFromWishList(product.id)}>
                                <ClearIcon fontSize="inherit" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default Wishlist
