"use client";

import React from 'react';

import { Box, Typography } from '@mui/material/';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { BreadCrumbStyles, CategoriesCardStyles, } from '@/components/Ui/Styles/Styles';
import { usePathname } from 'next/navigation';

function BreadCrumb() {

    const pathname = usePathname();

    // Split the pathname by '/' and filter out any empty strings
    const pathSegments = pathname.split('/')
        .filter(Boolean)
        .map(segment =>
            segment.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        );

    return (
        <Box sx={BreadCrumbStyles.containerBox}>
            <Box sx={BreadCrumbStyles.contentBox}>
                <Typography sx={{ ...BreadCrumbStyles.disabledColor, ...BreadCrumbStyles.activeTypo }}>
                    Home
                </Typography>
                <ChevronRightOutlinedIcon sx={BreadCrumbStyles.disabledColor} />
                <Typography sx={{ ...CategoriesCardStyles.listItemText, ...BreadCrumbStyles.activeTypo }}>
                    {pathSegments}
                </Typography>
            </Box>
        </Box>
    );
}

export default BreadCrumb;




