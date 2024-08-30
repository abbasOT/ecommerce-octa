"use client"
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { WhyChooseUsStyles, ProductCardStyles, DisplayProductsStyles, ProductReviewsStyles, ProductDetailStyles } from '@/components/Ui/Styles/Styles';
import ProductReviewCard from '../ProductReviewCard/ProductReviewCard';
import ProductReviewForm from '../ProductReviewForm/ProductReviewForm';

function ProductReviews() {

    const [selectedDeviceType, setSelectedDeviceType] = useState("Select Device Type");
    const product = useSelector((state) => state.product.selectedProduct);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (product?.id) {
            fetchReviews(product.id);
        }
    }, [product]);

    const fetchReviews = async (productId) => {
        try {
            const response = await fetch(`/api/review/read?product_id=${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data.reviews); // Assuming API returns { reviews: [...] }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    return (
        <>
            <Box sx={{ ...DisplayProductsStyles.headingContainerBox, width: "100%" }}>
                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...DisplayProductsStyles.headingStyle }}>
                    {reviews.length} Reviews
                </Typography>
                <Select
                    sx={ProductDetailStyles.productReviewsSelectField}
                    id="deviceType"
                    value={selectedDeviceType}
                    onChange={(e) => setSelectedDeviceType(e.target.value)}
                >
                    <MenuItem value="Select Device Type">Newest</MenuItem>
                    <MenuItem value="Single-Phase">Old</MenuItem>
                    <MenuItem value="3-Phase">All</MenuItem>
                </Select>

            </Box>

            <Box sx={ProductDetailStyles.productReviewsContentContainerBox}>
                <Box> {reviews.map((review) => (
                    <ProductReviewCard key={review.id} review={review} />
                ))}
                </Box>
                <Box>
                    <ProductReviewForm />
                </Box>
            </Box>

        </>
    )
}

export default ProductReviews
