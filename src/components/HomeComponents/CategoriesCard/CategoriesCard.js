import React, { useState, useEffect } from 'react';
import { Divider, Paper, MenuList, MenuItem, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CategoriesCardStyles, DisplayProductsStyles } from '@/components/Ui/Styles/Styles';
import { setSelectedCategory, fetchCategories, setSelectedCategoryWithProducts, } from '../../../redux/slices/categoriesSlice';
import { useSelector, useDispatch } from 'react-redux';
import medusa from '@/medusaClient';
export default function CategoriesCard() {
    const dispatch = useDispatch();
    const router = useRouter();
    // const medusa = useSelector((state) => state.medusaConfig.medusa);
    const categories = useSelector((state) => state.categories.allCategories);
    const categoriesWithProducts = useSelector((state) => state.categories.allCategoriesWithProducts);

    useEffect(() => {
        dispatch(fetchCategories(medusa));
    }, [dispatch, medusa]);


    const handleCategoryClick = (categoryName) => {
        // Redirect to shop page with selected category ID
        router.push(`/shop`);
        dispatch(setSelectedCategory(categoryName));
        // Find all products that belong to the selected category
        let productsInCategory = [];
        // Iterate through categoriesWithProducts to find the selected category
        categoriesWithProducts.forEach(item => {
            if (item.product_category.name === categoryName && item.product) {
                // Concatenate the products of the selected category
                productsInCategory = productsInCategory.concat(item.product);
            }
        });
        // Dispatch action to store products in Redux state
        dispatch(setSelectedCategoryWithProducts(productsInCategory));
    };

    // Filter out categories that have a parent_category_id
    const parentCategories = categories.filter(category => !category.parent_category_id);

    return (
        <Box m={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper sx={CategoriesCardStyles.paperStyle}>
                <MenuList sx={CategoriesCardStyles.menuListStyle}>
                    <MenuItem sx={CategoriesCardStyles.CategoriesCardTitleBox}>
                        <Typography sx={CategoriesCardStyles.CategoriesCardTitleText}>
                            CATEGORIES
                        </Typography>
                    </MenuItem>
                    <Divider className='custom-divider' />
                    {parentCategories.map(category => (
                        <React.Fragment key={category.id}>
                            <MenuItem
                                sx={CategoriesCardStyles.listItemStyle}
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <Typography sx={CategoriesCardStyles.listItemText}>
                                    {category.name}
                                </Typography>
                                {category.category_children.length > 0 && (
                                    <ChevronRightIcon sx={DisplayProductsStyles.iconStyle} />
                                )}
                            </MenuItem>
                            {/* You can optionally show subcategories here */}
                            {/* {expandedCategoryId === category.id && (
                                category.category_children.map(subcategory => (
                                    <MenuItem
                                        key={subcategory.id}
                                        sx={CategoriesCardStyles.listItemStyle}
                                    >
                                        <Typography sx={CategoriesCardStyles.listItemText}>
                                            {subcategory.name}
                                        </Typography>
                                    </MenuItem>
                                ))
                            )} */}
                            <Divider className='custom-divider' />
                        </React.Fragment>
                    ))}
                </MenuList>
            </Paper>
        </Box>
    );
}
