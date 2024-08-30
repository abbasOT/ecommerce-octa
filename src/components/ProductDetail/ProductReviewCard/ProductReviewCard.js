"use client"

import React from 'react'
import { Box, Typography, Stack, Rating, Avatar } from '@mui/material'
import { CategoriesCardStyles, BreadCrumbStyles, ProductDetailStyles } from '@/components/Ui/Styles/Styles'

function ProductReviewCard({ review }) {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <Box sx={ProductDetailStyles.productReviewCardContainerBox}>
            <Avatar
                alt="Remy Sharp"
                src=""
                sx={ProductDetailStyles.productReviewCardAvatarStyle}
            />
            <Box sx={ProductDetailStyles.productReviewCardTitleBox}>
                <Typography sx={{ ...CategoriesCardStyles.listItemText, ...BreadCrumbStyles.activeTypo }}>
                    {review.name}
                </Typography>
                <Typography sx={{ ...CategoriesCardStyles.listItemText, ...BreadCrumbStyles.activeTypo, opacity: "20%" }}>
                    {formatDate(review.createdAt)}
                </Typography>
            </Box>
            <Stack spacing={1} mt={1}>
                <Rating name="size-medium" value={review.rating} readOnly />
            </Stack>
            <Typography sx={{ ...CategoriesCardStyles.listItemText, ...BreadCrumbStyles.activeTypo, ...ProductDetailStyles.productReviewCardMsgTypo }}>
                {review.comment}
            </Typography>
        </Box>
    )
}

export default ProductReviewCard
