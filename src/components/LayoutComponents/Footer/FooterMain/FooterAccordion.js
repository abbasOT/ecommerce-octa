"use client"

import React from 'react';
import { Grid, Box, Typography, Button, TextField, InputAdornment, List, ListItem, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FooterMainStyles } from '@/components/Ui/Styles/Styles';
import { useRouter } from 'next/navigation';
import { setSelectedCategory, setSelectedCategoryWithProducts } from '@/redux/slices/categoriesSlice';
import { searchValues } from '@/redux/slices/searchBar';
export default function FooterAccordion() {

    const dispatch = useDispatch();
    const router = useRouter();
    const [expanded, setExpanded] = React.useState(false);
    const categories = useSelector((state) => state.categories.allCategories);
    const parentCategories = categories?.filter(category => !category.parent_category_id);
    const allProducts = useSelector((state) => state.product.allProducts);
    const categoriesWithProducts = useSelector((state) => state.categories.allCategoriesWithProducts);


    const categoryNames = parentCategories?.map(category => category.name);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const accordionData = [
        {
            title: "Categories",
            items: categoryNames
        },
        {
            title: "Useful Links",
            items: [
                "Home",
                "Contact Us",
                "About Us",
                "Privacy Policy",
                "Terms & Condition",
                "Returns"
            ],
        }
    ];


    const routesMap = {
        "Home": "/",
        "Contact Us": "/contact",
        "About Us": "/about",
        "Privacy Policy": "/our/privacy-policy",
        "Terms & Condition": "/our/terms-conditions",
        "Returns": "/our/returns-policy"
    };

    const handleClickRoute = (routeLabel) => {
        // Find the correct path from the routesMap based on the routeLabel
        const routePath = routesMap[routeLabel];

        // If the route path exists, push it to the router
        if (routePath) {
            router.push(routePath);
        } else {
            console.error(`No route found for ${routeLabel}`);
        }
    };


    const handleCategoryClick = (categoryName) => {

        console.log("inside the category click footer")
        // Redirect to shop page with selected category ID
        dispatch(searchValues({ searchQuery: "" }));
        dispatch(setSelectedCategory(categoryName));
        // Find all products that belong to the selected category
        let productsInCategory = [];
        // Iterate through categoriesWithProducts to find the selected category
        categoriesWithProducts.forEach(item => {
            if (item.product_category.name === categoryName && item.product) {
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
        router.push(`/shop`);

    };

    return (

        <Box width={"90%"}>
            {accordionData.map((section, index) => (
                <Accordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    sx={{ ...FooterMainStyles.FooterAccordionStyle, marginTop: index !== 0 ? "1rem" : "0" }}
                >
                    <AccordionSummary
                        expandIcon={expanded === `panel${index}` ? <RemoveIcon style={{ color: 'var(--primary-color)' }} /> : <AddIcon style={{ color: 'var(--primary-color)' }} />}
                        aria-controls={`panel${index}bh-content`}
                        id={`panel${index}bh-header`}
                        style={FooterMainStyles.FooterAccordionSummaryStyle}
                    >
                        <Typography sx={FooterMainStyles.listHeadingStyle}>{section.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List sx={FooterMainStyles.secondDescription}>
                            {section.items.map((item, itemIndex) => (
                                <ListItem key={itemIndex}
                                    onClick={() => {
                                        // Check if the section is "Useful Links" or "Categories"
                                        if (section.title === "Useful Links") {
                                            handleClickRoute(item);
                                        } else if (section.title === "Categories") {
                                            handleCategoryClick(item);
                                        }
                                    }}
                                >{item}</ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>

    );
}


