"use client"
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { WhyChooseUsStyles, ProductCardStyles, DisplayProductsStyles, ProductReviewsStyles, ProductDetailStyles } from '@/components/Ui/Styles/Styles';
import ProductReviewCard from '../ProductReviewCard/ProductReviewCard';
import ProductReviewForm from '../ProductReviewForm/ProductReviewForm';

function ProductReviews() {

    const [selectedSortingType, setSelectedSortingType] = useState("new");
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


    const sortReviews = (reviews, sortingType) => {
        if (sortingType === "new") {
            // Sort by newest first
            return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortingType === "old") {
            // Sort by oldest first
            return reviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else {
            // Default case (if "default" or any unhandled value is selected)
            return reviews;
        }
    };

    const sortedReviews = sortReviews([...reviews], selectedSortingType); // Sorted reviews array



    return (
        <>
            <Box sx={{ ...DisplayProductsStyles.headingContainerBox, width: "100%" }}>
                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...DisplayProductsStyles.headingStyle }}>
                    {reviews.length} Reviews
                </Typography>
                <Select
                    sx={ProductDetailStyles.productReviewsSelectField}
                    id="sortingType"
                    value={selectedSortingType}
                    onChange={(e) => setSelectedSortingType(e.target.value)}
                >
                    <MenuItem value="new">Newest</MenuItem>
                    <MenuItem value="old">Old</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                </Select>

            </Box>

            <Box sx={ProductDetailStyles.productReviewsContentContainerBox}>
                <Box>
                    {/* {reviews.map((review) => (
                    <ProductReviewCard key={review.id} review={review} />
                ))} */}
                    {sortedReviews.map((review) => (
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
