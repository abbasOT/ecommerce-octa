"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { FooterMainStyles, ShopStyles } from '@/components/Ui/Styles/Styles';
import { setSelectedCategory, setSelectedCategoryWithProducts } from '@/redux/slices/categoriesSlice';
import { searchValues } from '@/redux/slices/searchBar';
import { useSelector, useDispatch } from 'react-redux';


function ShopCategoriesCard() {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.allCategories);
    const allProducts = useSelector((state) => state.product.allProducts);
    const categoriesWithProducts = useSelector((state) => state.categories.allCategoriesWithProducts);
    const parentCategories = categories.filter(category => !category.parent_category_id);
    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    const handleCategoryClick = (name) => {
        dispatch(searchValues({ searchQuery: "" }));
        dispatch(setSelectedCategory(name));

        // Find all products that belong to the selected category
        let productsInCategory = [];
        // Iterate through categoriesWithProducts to find the selected category
        // categoriesWithProducts.forEach(item => {
        //     if (item.product_category.name === name && item.product) {
        //         // Concatenate the products of the selected category
        //         productsInCategory = productsInCategory.concat(item.product);
        //     }
        // });
        categoriesWithProducts.forEach(item => {
            if (item.product_category.name === name && item.product) {
                // Check if the product exists in the allProducts array
                const productExistsInAllProducts = allProducts.some(product => product.id === item.product.id);

                if (productExistsInAllProducts) {
                    // Concatenate only products that exist in allProducts array
                    productsInCategory = productsInCategory.concat(item.product);
                }
            }
        });
        // Dispatch action to store products in Redux state
        dispatch(setSelectedCategoryWithProducts(productsInCategory));
    };

    console.log(categoriesWithProducts)

    // const getCategoryProductCount = (categoryName) => {

    //     return categoriesWithProducts.reduce((count, categoryProduct) => {
    //         if (categoryProduct.product_category.name === categoryName && categoryProduct.product_id === allProducts[0].id) {
    //             return count + 1;
    //         }
    //         return count;
    //     }, 0);
    // };



    const getCategoryProductCount = (categoryName) => {
        return categoriesWithProducts.reduce((count, categoryProduct) => {
            // Check if the category matches and the product ID exists in the allProducts array
            const productExistsInAllProducts = allProducts.some(product => product.id === categoryProduct.product_id);

            if (categoryProduct.product_category.name === categoryName && productExistsInAllProducts) {
                return count + 1;
            }
            return count;
        }, 0);
    };


    return (
        <Box sx={ShopStyles.shopCategoriesContainerBox}>
            {parentCategories.map((category, index) => (
                <Box
                    key={index}
                    sx={{
                        ...FooterMainStyles.firstGrid, ...ShopStyles.shopCategoriesContentBox, borderBottom: selectedCategory === category.name ? "3px solid #2E838F" : "none",
                        transition: 'transform 0.3s ease', // Smooth transition
                        transform: selectedCategory === category.name ? 'scale(1.1)' : 'scale(1)', // Scale up if selected
                        zIndex: selectedCategory === category.name ? 5 : 'auto', // Ensure selected card is above others
                        position: 'relative', // Ensure card is positioned correctly
                    }}
                    onClick={() => handleCategoryClick(category.name)}
                >
                    <Image src={category.image} alt={`${category.name} image`} />
                    <Typography
                        sx={{
                            ...ShopStyles.shopCategoriesTypo, color: selectedCategory === category.name ? "#444444" : "#333E48",
                            // fontWeight: selectedCategory === category.name ? "bold" : 300,
                        }}
                    >
                        {category.name} ({getCategoryProductCount(category.name)})
                    </Typography>
                </Box>
            ))}

        </Box>
    );
}

export default ShopCategoriesCard;
