"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { WhyChooseUsStyles, ProductCardStyles, DisplayProductsStyles } from '@/components/Ui/Styles/Styles';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import HeadingBar from '../HeadingBar/HeadingBar';
import { allProducts } from '@/redux/slices/productSlice';
import medusa from '@/medusaClient';
function DisplayProducts({ heading }) {
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch()

    const products = useSelector((state) => state.product.allProducts);
    // const medusa = useSelector((state) => state.medusaConfig.medusa);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const fetchDataFromDatabase = () => {
            medusa.products.list()
                .then(({ products }) => {
                    // setProducts(products)
                    dispatch(allProducts(products))

                })
                .catch((error) => {
                    console.error("Failed to fetch products:", error);
                });
        };

        fetchDataFromDatabase();
    }, []); // Run once on component mount

    // const filteredProducts = products.filter(product =>
    //     product.collection && product.collection?.title?.trim().toLowerCase() === heading.trim().toLowerCase()
    // );
    const filteredProducts = heading === "Similar Products"
        ? products
        : products.filter(product =>
            product.collection && product.collection?.title?.trim().toLowerCase() === heading.trim().toLowerCase()
        );

    const totalPages = Math.ceil(filteredProducts.length / 3); // Calculate total pages

    const handleJumpToIndex = (index) => {
        setStartIndex(index * 3);
    };

    return (
        <div>
            <Box sx={DisplayProductsStyles.containerBox}>
                <Box sx={DisplayProductsStyles.headingContainerBox}>
                    <Box sx={DisplayProductsStyles.headingBox}>
                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...DisplayProductsStyles.headingStyle }}>
                            {heading}
                        </Typography>
                        <Box sx={DisplayProductsStyles.arrowButtonsBox}>
                            <Box sx={DisplayProductsStyles.arrowButtonStyle}>
                                <ChevronLeftIcon sx={DisplayProductsStyles.iconStyle} />
                            </Box>
                            <Box sx={DisplayProductsStyles.arrowButtonStyle}>
                                <ChevronRightIcon sx={DisplayProductsStyles.iconStyle} />
                            </Box>
                        </Box>
                    </Box>
                    {!isMobile && heading === "New Products" &&
                        <Box sx={{ alignItems: "flex-end" }}>
                            <Button variant='text' sx={DisplayProductsStyles.viewAllButton}>
                                View all
                                <ChevronRightIcon sx={{ width: "20px" }} />
                            </Button>
                        </Box>
                    }
                </Box>
                <HeadingBar leftValue={"0%"} />

                <Box sx={DisplayProductsStyles.displayProductsBox}>
                    {filteredProducts.slice(startIndex, startIndex + 3).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Box>

                <Box sx={DisplayProductsStyles.dotsBox}>
                    {[...Array(totalPages)].map((_, index) => (
                        <CircleSharpIcon
                            key={index}
                            sx={{ ...DisplayProductsStyles.dotIconsStyles, color: startIndex / 3 === index ? "#2E838F" : 'rgba(46, 131, 143, 0.14)' }}
                            onClick={() => handleJumpToIndex(index)}
                        />
                    ))}
                </Box>
            </Box>
        </div>
    );
}

export default DisplayProducts;
