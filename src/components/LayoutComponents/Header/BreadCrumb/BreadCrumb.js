

"use client";

import React from 'react';
import { Box, Typography } from '@mui/material/';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { BreadCrumbStyles, CategoriesCardStyles } from '@/components/Ui/Styles/Styles';
import { usePathname } from 'next/navigation';

function BreadCrumb() {
    const pathname = usePathname();

    // Split the pathname by '/' and filter out any empty strings
    const pathSegments = pathname.split('/').filter(Boolean);

    // Create a human-readable breadcrumb trail
    const breadcrumbItems = pathSegments.map((segment, index) => {
        // Capitalize the first letter and separate words by space
        const formattedSegment = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const isLastItem = index === pathSegments.length - 1;
        const textStyle = isLastItem ? BreadCrumbStyles.activeTypo : BreadCrumbStyles.disabledColor;

        return (
            <React.Fragment key={index}>
                <Typography sx={{ ...CategoriesCardStyles.listItemText, ...textStyle }}>
                    {formattedSegment}
                </Typography>
                {!isLastItem && (
                    <ChevronRightOutlinedIcon sx={BreadCrumbStyles.disabledColor} />
                )}
            </React.Fragment>
        );
    });

    return (
        <Box sx={BreadCrumbStyles.containerBox}>
            <Box sx={BreadCrumbStyles.contentBox}>
                <Typography sx={{ ...CategoriesCardStyles.listItemText, ...BreadCrumbStyles.disabledColor }}>
                    Home
                </Typography>
                {pathSegments.length > 0 && (
                    <ChevronRightOutlinedIcon sx={BreadCrumbStyles.disabledColor} />
                )}
                {breadcrumbItems}
            </Box>
        </Box>
    );
}

export default BreadCrumb;
