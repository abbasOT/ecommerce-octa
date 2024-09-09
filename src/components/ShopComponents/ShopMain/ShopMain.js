"use client"

import React, { useEffect } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import DisplayProducts from '@/components/HomeComponents/DisplayProducts/DisplayProducts'
import ShopCategoriesCard from '../ShopCategoriesCard/ShopCategoriesCard'
import FilterSideBar from '../FilterSideBar/FilterSideBar'
import ProductCard from '@/components/HomeComponents/ProductCard/ProductCard'
import FilterTopBar from '../FilterTopBar/FilterTopBar'
import { ShopStyles } from '@/components/Ui/Styles/Styles'
import { useDispatch, useSelector } from 'react-redux';
import { setColorFilter, setSizeFilter, setPriceRangeFilter, removeColorFilter, removeSizeFilter, removePriceRangeFilter } from '@/redux/slices/filterProductsSlice';


function ShopMain() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.categories.selectedCategorywithProducts)
    const allProducts = useSelector((state) => state.product.allProducts)
    const { color, size, appliedPriceRange } = useSelector((state) => state.filterProducts);
    const searchQuery = useSelector((state) => state.searchBar.searchQuery);



    console.log(color)
    // Function to check if the product matches the filters
    // Function to check if the product matches the filters
    const isProductMatched = (product) => {
        // Check price range

        const productName = product.title.toLowerCase(); // Assuming `product.title` is the name field

        // If there's a search query, check if the product matches the search query
        if (searchQuery && !productName.includes(searchQuery)) {
            return false;
        }


        const productPrice = product.variants[0].prices[0].amount * 280;
        if (appliedPriceRange?.length === 2 && (productPrice < appliedPriceRange[0] || productPrice > appliedPriceRange[1])) {
            return false;
        }

        // Check color
        const productColors = product.variants.flatMap(variant => variant.options.map(opt => opt.value.toLowerCase()));
        if (color?.length && !color.some(c => productColors.includes(c.toLowerCase()))) {
            return false;
        }

        // Check size
        const productSizes = product.variants.flatMap(variant => variant.options.map(opt => opt.value.toLowerCase()));
        if (size?.length && !size.some(s => productSizes.includes(s.toLowerCase()))) {
            return false;
        }

        return true;
    };

    let productList;

    if (searchQuery !== "") {
        // If searchQuery is present, filter directly from allProducts
        productList = allProducts.filter(product => isProductMatched(product));
    } else {
        // If no searchQuery, map over selectedCategorywithProducts and find matching products in allProducts
        productList = products.map(product => {
            const matchingProduct = allProducts.find(p => p.id === product.id);
            return matchingProduct ? { ...product, ...matchingProduct } : null;
        }).filter(product => product !== null && isProductMatched(product));
    }


    console.log(productList, "the products i am looking for");


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={12} sx={ShopStyles.mainFirstGrid}>
                <ShopCategoriesCard />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3.2} sx={ShopStyles.mainSecondGrid}>
                <FilterSideBar />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8.8} sx={ShopStyles.mainThirdGrid}>
                <FilterTopBar />
                <Box sx={{ display: "flex", flexFlow: "wrap" }}>
                    {productList.length > 0 ? (
                        productList.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    ) : (
                        <Typography sx={{ textAlign: "center", pt: "4rem" }}>
                            No products found in this category with the applied filters.
                        </Typography>
                    )}
                </Box>
            </Grid>
        </Grid>


    )
}

export default ShopMain
