"use client"

import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, CircularProgress } from '@mui/material'
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
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    const products = useSelector((state) => state.categories.selectedCategorywithProducts)
    const allProducts = useSelector((state) => state.product.allProducts)
    const selectedCategory = useSelector((state) => state.categories.selectedCategory)
    const { appliedPriceRange } = useSelector((state) => state.filterProducts);
    const sortingFilterValue = useSelector((state) => state.filterProducts.sorting)
    const searchQuery = useSelector((state) => state.searchBar.searchQuery);



    // Function to check if the product matches the filters
    // Function to check if the product matches the filters
    const isProductMatched = (product) => {
        // Check price range

        const productName = product.title.toLowerCase(); // Assuming `product.title` is the name field

        // If there's a search query, check if the product matches the search query
        if (searchQuery && !productName.includes(searchQuery.toLowerCase())) {
            return false;
        }


        // Check price range only if appliedPriceRange is set and valid
        const productPrice = product?.variants?.[0]?.prices?.[0]?.amount || 0; // Fallback to 0 if price is undefined
        if (appliedPriceRange?.length === 2 && appliedPriceRange[0] !== null && appliedPriceRange[1] !== null) {
            if (productPrice < appliedPriceRange[0] || productPrice > appliedPriceRange[1]) {
                return false;
            }
        }

        // // Check color
        // const productColors = product.variants.flatMap(variant => variant.options.map(opt => opt.value.toLowerCase()));
        // if (color?.length && !color.some(c => productColors.includes(c.toLowerCase()))) {
        //     return false;
        // }

        // // Check size
        // const productSizes = product.variants.flatMap(variant => variant.options.map(opt => opt.value.toLowerCase()));
        // if (size?.length && !size.some(s => productSizes.includes(s.toLowerCase()))) {
        //     return false;
        // }

        return true;
    };


    const sortProductsByDate = (products, sortOrder) => {
        const productsCopy = [...products]; // Create a shallow copy of the products array

        return productsCopy.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);

            if (sortOrder === "old") {
                return dateB - dateA; // Descending: Older products first
            } else if (sortOrder === "new") {
                return dateA - dateB; // Ascending: Newer products first
            }

            return 0; // No sorting if sortOrder is not specified
        });
    };

    useEffect(() => {
        setLoading(true); // Start loading when component mounts or dependencies change
        let filteredProducts;
        if (selectedCategory === "" && searchQuery === "") {
            filteredProducts = allProducts
        }
        else if (searchQuery !== "") {
            // If searchQuery is present, filter directly from allProducts
            filteredProducts = allProducts?.filter(product => isProductMatched(product));
        } else {
            // If no searchQuery, map over selectedCategorywithProducts and find matching products in allProducts
            if (!products) {
                filteredProducts = allProducts?.filter(product => isProductMatched(product));
            }
            else {
                filteredProducts = products?.map(product => {
                    const matchingProduct = allProducts.find(p => p.id === product.id);
                    return matchingProduct ? { ...product, ...matchingProduct } : null;
                }).filter(product => product !== null && isProductMatched(product));
            }

        }
        filteredProducts = sortProductsByDate(filteredProducts, sortingFilterValue);
        setProductList(filteredProducts); // Set the filtered products
        setLoading(false); // Stop loading once products are set
    }, [allProducts, products, searchQuery, appliedPriceRange, sortingFilterValue, selectedCategory]);

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
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", pt: "4rem" }}>
                        <CircularProgress sx={{ color: 'var(--primary-color)' }} />
                    </Box>
                ) : (
                    <Box sx={{ width: "100%", padding: "1rem 3rem", display: "flex", justifyContent: "center" }}>
                        <Box width={"100%"}>
                            <Box sx={{ display: "flex", flexFlow: "wrap", padding: "1rem", justifyContent: { sm: "start", xs: "center" } }} >
                                {
                                    productList.length > 0 ? (
                                        productList.map((product, index) => (
                                            <ProductCard key={index} product={product} />
                                        ))
                                    ) : (
                                        <Typography sx={{ textAlign: "center", pt: "4rem" }}>
                                            No products found in this category with the applied filters.
                                        </Typography>
                                    )
                                }
                            </Box>
                        </Box>
                    </Box>

                )}
                {/* <Box sx={{ display: "flex", flexFlow: "wrap" }}>
                    {productList.length > 0 ? (
                        productList.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    ) : (
                        <Typography sx={{ textAlign: "center", pt: "4rem" }}>
                            No products found in this category with the applied filters.
                        </Typography>
                    )}
                </Box> */}
            </Grid>
        </Grid >


    )
}

export default ShopMain
