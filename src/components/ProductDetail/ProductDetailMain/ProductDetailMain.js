"use client";

import { Grid, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useState } from 'react';
import { styles } from "../../Ui/Styles/SecondaryStyles";
import { ProductDetailStyles } from '@/components/Ui/Styles/Styles';
import ProductDetailPictures from '../ProductDetailPictures/ProductDetailPictures';
import ProductDetailActionBtns from '../ProductDetailActionBtns/ProductDetailActionBtns';
import ProductReviews from '../ProductReviews/productReviews';
import ProductDescription from '../ProductDescription/ProductDescription';

export default function ProductDetailMain() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container sx={styles.main} spacing={2}>
            <Grid
                item xs={12} sm={12} md={5} lg={5}
                sx={ProductDetailStyles.productDetailMainFirstGrid}
            >
                <ProductDetailPictures />
            </Grid>

            <Grid xs={12} sm={12} md={7} lg={7}
                sx={ProductDetailStyles.productDetailMainSecondGrid}
            >
                <ProductDetailActionBtns />
            </Grid>

            <Grid item xs={12} sx={ProductDetailStyles.productDetailMainThirdGrid}>
                <Box sx={ProductDetailStyles.productDetailTabsContainerBox}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: '1.5px solid #E4E4E7' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Description" value="1" />
                                <Tab label="Reviews" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <ProductDescription />
                        </TabPanel>
                        <TabPanel value="2">
                            <ProductReviews />
                        </TabPanel>

                    </TabContext>
                </Box>
            </Grid>

        </Grid>
    );
}
