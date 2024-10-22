"use client"

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import GLobalDelivery from "../../Ui/Assets/Home/GlobalDelivery.svg"
import EasePayment from "../../Ui/Assets/Home/EasyPayment.svg"
import FreeShipping from "../../Ui/Assets/Home/FreeShipping.svg"
import Heart from "../../Ui/Assets/Home/cartHeart.svg"
import Product from "../../Ui/Assets/Home/ProductImg.svg"
import Line from "../../Ui/Assets/Home/cartLine.svg"
import Bg from "../../Ui/Assets/Home/productOnSaleBg.svg"
import { useDispatch, useSelector } from 'react-redux';
import medusa from '@/medusaClient';
import Image from 'next/image';
import { FooterMainStyles, RegistrationStyles, ServiceCardStyles, WhyChooseUsStyles, ProductCardStyles, ProductOnSaleStyles } from '@/components/Ui/Styles/Styles';
import ProductCard from '../ProductCard/ProductCard';
import { allProducts, allProductsFromMedusa } from '@/redux/slices/productSlice';



function ProductOnSale() {


    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.allProducts);
    // const [products, setProducts] = useState([]);
    const customerId = useSelector((state) => state.medusaConfig.customer_id);


    // useEffect(() => {
    //     // Define the function within the useEffect
    //     const fetchProductFromMedusa = async () => {
    //         try {
    //             const { products } = await medusa.products.list();
    //             dispatch(allProductsFromMedusa(products)); // Dispatch to Redux
    //         } catch (error) {
    //             console.error("Failed to fetch products:", error);
    //         }
    //     };

    //     // Call the function
    //     fetchProductFromMedusa();
    // }, []);

    // const productsFromMedusa = useSelector((state) => state.product.allProductsFromMedusa);
    // console.log(productsFromMedusa, "the data of the products from redux")



    // Fetch reviews for a product
    const fetchReviews = async (productId) => {
        try {
            const response = await fetch(`/api/review/read?product_id=${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            return data.reviews || []; // Return reviews or empty array if no data
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return [];
        }
    };

    // Fetch wishlist for a customer (only if customerId is present)
    const fetchWishList = async (customerId) => {
        if (customerId === "") return null; // Skip fetching if no customerId

        try {
            const response = await fetch(`/api/wishlist/read?customer_id=${customerId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wishlist');
            }
            const data = await response.json();
            return data.wishList || null; // Return wishlist or null if no data
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            return null;
        }
    };

    // Calculate average rating from reviews
    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 5; // Default to 5 if no reviews

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        return Math.round(averageRating * 2) / 2; // Round to nearest 0.5
    };

    // Fetch wishlist and reviews for each product and update the product data
    const fetchAndUpdateProductData = async () => {


        const wishlist = customerId ? await fetchWishList(customerId) : [];

        const { products } = await medusa.products.list();

        const updatedProducts = await Promise.all(products.map(async (product) => {
            const { id: productId } = product; // Assume products have 'id', no 'customerId' present in product by default



            console.log("inside the func of updateProducts")
            // Fetch reviews for the product
            const reviews = await fetchReviews(productId);

            // Fetch wishlist only if `customerId` is available
            const isInWishlist = wishlist.length > 0
                ? wishlist.some(wishlistItem => wishlistItem.product_id === productId)
                : false;

            // Calculate average rating
            const averageRating = calculateAverageRating(reviews);
            const totalReviews = reviews.length;

            // Return updated product data
            return {
                ...product,
                addedInWishList: isInWishlist ? 'yes' : 'no',
                averageRating: averageRating,  // average rating
                totalReviews: totalReviews
            };
        }));

        console.log("inside the func of updateProducts and going to dispatch this data", updatedProducts)
        // Dispatch the updated products to the Redux store
        dispatch(allProducts(updatedProducts));
    };

    useEffect(() => {
        fetchAndUpdateProductData();
    }, []);






    const productsOnSale = products.filter(product => product.collection?.title === "Products on Sale");


    return (
        <Box sx={ProductOnSaleStyles.containerBox}>
            <Grid spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={2.5} sx={ProductOnSaleStyles.typoGridStyle} >
                    <Box>
                        <Typography sx={{ ...FooterMainStyles.FooterBarContentTypo, ...ProductOnSaleStyles.firstHeading }}>
                            Products On Sale
                        </Typography>
                        <Typography sx={{ ...FooterMainStyles.FooterBarContentTypo, ...ProductOnSaleStyles.secondHeading }}>
                            Shop Now!
                        </Typography>
                    </Box>
                </Grid>



                {/* <Grid key={product.id} item xs={12} sm={6} xl={4} sx={{ ...FooterMainStyles.firstGrid, ...WhyChooseUsStyles.contentBox }}> */}
                <Box sx={{ display: "flex", flexFlow: "wrap", padding: "1rem", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    {productsOnSale.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Box>
                {/* </Grid> */}


            </Grid>
        </Box >
    );
}

export default ProductOnSale;






{/* <Box sx={{ ...RegistrationStyles.formBox, ...ServiceCardStyles.cardBox, ...ProductOnSaleStyles.cartBox }}>
                        <Box sx={ProductCardStyles.heartBox}>
                            <Image src={Heart} width={25} />
                        </Box>
                        <Image src={Product} />
                        <Image src={Line} width={250} />
                        <Box sx={ProductCardStyles.contentBox}>
                            <Box sx={ProductCardStyles.descriptionBox}>
                                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo }}>
                                    Iphone 14 promax 256 gig
                                </Typography>
                                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont }}>
                                    $930.90
                                </Typography>
                            </Box>

                        </Box>
                    </Box> */}