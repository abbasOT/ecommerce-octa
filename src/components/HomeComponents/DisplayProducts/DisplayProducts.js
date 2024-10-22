"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery, Skeleton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { WhyChooseUsStyles, ProductCardStyles, DisplayProductsStyles } from '@/components/Ui/Styles/Styles';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import HeadingBar from '../HeadingBar/HeadingBar';
import { allProducts } from '@/redux/slices/productSlice';
import medusa from '@/medusaClient';
import { useRouter } from 'next/navigation';





function DisplayProducts({ heading }) {
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const products = useSelector((state) => state.product.allProducts);
    // const medusa = useSelector((state) => state.medusaConfig.medusa);
    const [startIndex, setStartIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false); // Track animation state
    const [animationDirection, setAnimationDirection] = useState('next'); // Slide direction
    const [isPaused, setIsPaused] = useState(false); // Track if we're moving forward or backward

    const isFirstLoadStored = localStorage.getItem('firstLoad');

    // useEffect(() => {
    //     if (!isFirstLoadStored) {
    //         // If it's the first load, fetch products
    //         const fetchDataFromDatabase = () => {
    //             setIsLoading(true);
    //             setIsPaused(true);

    //             medusa.products.list()
    //                 .then(({ products }) => {
    //                     dispatch(allProducts(products));
    //                     setIsLoading(false);
    //                     setIsPaused(false);
    //                     localStorage.setItem('firstLoad', 'true'); // Store the firstLoad flag in localStorage
    //                 })
    //                 .catch((error) => {
    //                     console.error("Failed to fetch products:", error);
    //                     setIsLoading(false);
    //                     setIsPaused(false);
    //                 });
    //         };

    //         fetchDataFromDatabase();
    //     } else {
    //         // If it's not the first load, avoid fetching
    //         setIsLoading(false);
    //     }
    // }, []);


    useEffect(() => {
        // If there are products in the Redux store, no need to fetch again
        if (products.length > 0) {
            setIsLoading(false); // Data is already present, no loading needed
            setIsPaused(false); // Resume any paused activity
            localStorage.setItem('firstLoad', 'true'); // Mark first load in localStorage
        } else {
            // If no products are found in the Redux store
            setIsLoading(true); // Show loading state as no products are available
            setIsPaused(true);
        }

        // Save 'firstLoad' flag if it's the first load

    }, [products]);





    // const filteredProducts = products.filter(product =>
    //     product.collection && product.collection?.title?.trim().toLowerCase() === heading.trim().toLowerCase()
    // );
    const filteredProducts = heading === "Similar Products"
        ? products
        : products.filter(product =>
            product.collection && product.collection?.title?.trim().toLowerCase() === heading.trim().toLowerCase()
        );

    const totalPages = Math.ceil(filteredProducts.length / 3); // Calculate total pages



    const currentPage = Math.floor(startIndex / 3);


    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                handleNextOrPreviousPage();
            }, 3000); // Every 3 seconds

            return () => clearInterval(interval); // Cleanup interval on unmount or manual change
        }
    }, [currentPage, isPaused]);



    const handleNextOrPreviousPage = () => {
        if (currentPage < totalPages - 1) {
            // Normal forward movement
            setAnimationDirection('next'); // Slide to the right
            setIsAnimating(true); // Trigger animation
            setTimeout(() => {
                setStartIndex(startIndex + 3); // Move forward by 3 items
                setIsAnimating(false); // Stop animation after page change
            }, 500);
        } else if (currentPage === totalPages - 1) {
            // Reached the last page, loop back to the first page
            setAnimationDirection('prev'); // Keep sliding forward direction
            setIsAnimating(true); // Trigger animation
            setTimeout(() => {
                setStartIndex(0); // Reset to the first page (index 0)
                setIsAnimating(false); // Stop animation after resetting
            }, 500); // 500ms matches animation duration
        }
    };



    const handleMouseEnter = () => {
        setIsPaused(true); // Stop interval when hovering
    };

    const handleMouseLeave = () => {
        setIsPaused(false); // Resume interval when leaving hover
    };


    const handleJumpToIndex = (index) => {
        setAnimationDirection(index > currentPage ? 'next' : 'prev'); // Set animation direction
        setIsAnimating(true); // Trigger animation
        setTimeout(() => {
            setStartIndex(index * 3);
            setIsAnimating(false); // Stop animation after page change
        }, 500); // 500ms matches animation duration
    };

    const handleViewAll = () => {
        router.push("/shop")
    }



    const handleNextPage = () => {
        setAnimationDirection('next'); // Slide to the right
        setIsAnimating(true); // Trigger animation
        setTimeout(() => {
            if (currentPage < totalPages - 1) {
                setStartIndex(startIndex + 3);
            } else {
                setStartIndex(0); // Loop back to the first page
            }
            setIsAnimating(false); // Stop animation after page change
        }, 500); // 500ms matches animation duration
    };

    const handlePreviousPage = () => {
        setAnimationDirection('prev'); // Slide to the left
        setIsAnimating(true); // Trigger animation
        setTimeout(() => {
            if (currentPage > 0) {
                setStartIndex(startIndex - 3);
            } else {
                setStartIndex((totalPages - 1) * 3); // Loop to the last page
            }
            setIsAnimating(false); // Stop animation after page change
        }, 500); // 500ms matches animation duration
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
                            {filteredProducts.length > 0 && (
                                <>
                                    {currentPage > 0 && (
                                        <Box
                                            sx={DisplayProductsStyles.arrowButtonStyle}
                                            onClick={handlePreviousPage}
                                        >
                                            <ChevronLeftIcon sx={DisplayProductsStyles.iconStyle} />
                                        </Box>
                                    )}
                                    {/* Conditionally render the right Chevron icon */}
                                    {currentPage < totalPages - 1 && (
                                        <Box
                                            sx={DisplayProductsStyles.arrowButtonStyle}
                                            onClick={handleNextPage}
                                        >
                                            <ChevronRightIcon sx={DisplayProductsStyles.iconStyle} />
                                        </Box>
                                    )}
                                </>
                            )}

                        </Box>
                    </Box>
                    {!isMobile && heading === "New Products" &&
                        <Box sx={{ alignItems: "flex-end" }}>
                            <Button variant='text' sx={DisplayProductsStyles.viewAllButton} onClick={handleViewAll}>
                                View all
                                <ChevronRightIcon sx={{ width: "20px" }} />
                            </Button>
                        </Box>
                    }
                </Box>
                <HeadingBar leftValue={"0%"} />
                <Box sx={{ overflow: "hidden", position: "relative" }}>
                    <Box
                        onMouseEnter={handleMouseEnter} // Stop automatic movement on hover
                        onMouseLeave={handleMouseLeave} // Resume automatic movement on leave
                        sx={{
                            ...DisplayProductsStyles.displayProductsBox,
                            transform: filteredProducts.length > 3 && isAnimating
                                ? animationDirection === 'next'
                                    ? 'translateX(-100%)' // Slide to the left for next
                                    : 'translateX(100%)' // Slide to the right for prev
                                : 'translateX(0)', // No transform if no products or not animating
                            transition: filteredProducts.length > 3 ? 'transform 0.5s ease-in-out' : 'none', // Only animate if products are available
                        }}>
                        {/* {filteredProducts.slice(startIndex, startIndex + 3).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))} */}
                        {/* {filteredProducts.length === 0 ? (
                            <Typography sx={{ textAlign: 'center', marginTop: 2, color: 'gray' }}>
                                No products available
                            </Typography>
                        ) : (
                            filteredProducts.slice(startIndex, startIndex + 3).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )} */}

                        {!isFirstLoadStored ? (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Skeleton variant="rectangular" width={300} height={260} />
                                <Skeleton variant="rectangular" width={300} height={260} />
                                <Skeleton variant="rectangular" width={300} height={260} />
                            </Box>
                        ) : filteredProducts.length === 0 ? (
                            // If no products found
                            <Typography sx={{ textAlign: 'center', marginTop: 2, color: 'gray' }}>
                                No products available
                            </Typography>
                        ) : (
                            // Render products once filtered products are ready
                            filteredProducts.slice(startIndex, startIndex + 3).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </Box>
                </Box>


                <Box sx={DisplayProductsStyles.dotsBox}>
                    {[...Array(totalPages)].map((_, index) => (
                        <CircleSharpIcon
                            key={index}
                            sx={{
                                ...DisplayProductsStyles.dotIconsStyles,
                                //  color: startIndex / 3 === index ? "#2E838F" : 'rgba(46, 131, 143, 0.14)',
                                color: currentPage === index ? "#2E838F" : 'rgba(46, 131, 143, 0.14)'
                            }}
                            onClick={() => handleJumpToIndex(index)}
                        />
                    ))}
                </Box>
            </Box>
        </div>
    );
}

export default DisplayProducts;
