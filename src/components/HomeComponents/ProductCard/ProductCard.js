"use client"
import React, { useState, useEffect } from 'react'
import { RegistrationStyles, ServiceCardStyles, WhyChooseUsStyles, ProductCardStyles } from '@/components/Ui/Styles/Styles'
import { Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { addProductToCart, addProductToWishList, selectProduct, removeProductFromCart, removeProductFromWishList } from '../../../redux/slices/productSlice';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Heart from "../../Ui/Assets/Home/cartHeart.svg"
import FilledHeart from "../../Ui/Assets/Home/cartFilledHeart.svg"
import Line from "../../Ui/Assets/Home/cartLine.svg"
import CartIcon from "../../Ui/Assets/Home/cartIcon.svg"
import Star from "../../Ui/Assets/Home/Star.svg"
import AddCartModal from '@/components/Ui/Dialogues/AddCart'
import WishListModal from '@/components/Ui/Dialogues/WishList'
import { useSelector } from 'react-redux';
import { format } from 'date-fns'
import axios from 'axios';

function ProductCard({ product }) {

    const customerId = useSelector((state) => state.medusaConfig.customer_id);
    const [showAddCartModal, setShowAddCartModal] = useState(false);
    const [showWishListModal, setShowWishListModal] = useState(false);
    const [wishlistDone, setWishlistDone] = useState(false);
    const [reviewsDone, setReviewsDone] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const [reviews, setReviews] = useState([]);
    const wishList = useSelector((state) => state.product.wishList);
    // const [customerWishList, setCustomerWishList] = useState([])

    const now = new Date();
    const formattedDate = now.toISOString();

    // useEffect(() => {
    //     if (customerId) {
    //         fetchWishList(customerId);
    //         fetchReviews(product?.id);
    //     }
    //     else {
    //         setWishlistDone(true);
    //         fetchReviews(product?.id);
    //     }

    // }, [customerId, product?.id]);

    // const fetchWishList = async (customerId) => {
    //     try {
    //         const response = await fetch(`/api/wishlist/read?customer_id=${customerId}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch wishlist');
    //         }
    //         const data = await response.json();
    //         setCustomerWishList(data.wishList);
    //     } catch (error) {
    //         console.error('Error fetching wishlist:', error);

    //     } finally {
    //         // Set reviews fetch as done
    //         setWishlistDone(true);
    //     }
    // };

    // const fetchReviews = async (productId) => {
    //     try {
    //         const response = await fetch(`/api/review/read?product_id=${productId}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch reviews');
    //         }
    //         const data = await response.json();
    //         setReviews(data.reviews); // Assuming API returns { reviews: [...] }
    //     } catch (error) {
    //         console.error('Error fetching reviews:', error);
    //     } finally {
    //         // Set reviews fetch as done
    //         setReviewsDone(true);
    //     }
    // };

    // const calculateAverageRating = (reviews) => {
    //     if (reviews.length === 0) return 0;

    //     const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    //     const averageRating = totalRating / reviews.length;
    //     const roundedRating = Math.round(averageRating * 2) / 2;
    //     return roundedRating;
    // }
    // const averageRating = calculateAverageRating(reviews);
    // const productRating = averageRating == 0 ? 5 : averageRating
    // const totalReviews = reviews ? reviews.length : 90

    const handleAddCart = () => {
        setShowAddCartModal(false);
        router.push(`/add-to-cart`);
    };

    const handleRemoveFromCart = () => {
        console.log("Removed from cart");
        dispatch(removeProductFromCart(product.id));
        setShowAddCartModal(false);
    };

    const handleWishList = () => {
        setShowWishListModal(false);
        router.push(`/my-account/Wishlist`);

    };
    const handleRemoveFromWishList = async () => {
        if (customerId === "") {
            // Directly remove from Redux if there's no customerId
            dispatch(removeProductFromWishList(product.id));
        } else {
            try {
                const response = await fetch('/api/wishlist/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'text/plain', // Change the Content-Type to text/plain
                    },
                    body: JSON.stringify({ productId: product.id, customerId: customerId }), // Include customerId in the request
                });

                if (response.ok) {
                    // Successfully removed from database, now update Redux
                    dispatch(removeProductFromWishList(product.id));
                } else {
                    console.error('Failed to delete wishlist item from database');
                }
            } catch (error) {
                console.error('Error deleting wishlist item:', error);
                // Fallback to updating Redux even if API call fails
                dispatch(removeProductFromWishList(product.id));
            }
        }

        setShowWishListModal(false);
    };
    const handleAddCartModalOpen = (e) => {
        e.stopPropagation();
        console.log("Added to cart");
        dispatch(addProductToCart(product));
        setShowAddCartModal(true);
    };

    // const handleWishListModalOpen = (e) => {
    //     e.stopPropagation();
    //     console.log("Added to Wishlist");
    //     dispatch(addProductToWishList(product));
    //     setShowWishListModal(true);
    // };

    const handleWishListModalOpen = async (e) => {
        e.stopPropagation();
        // Check if the customerId is not an empty string
        const productWithTimestamp = {
            ...product,
            createdAt: formattedDate
        };
        if (customerId !== "") {
            try {
                // API call to add product to wishlist
                // const response = await axios.post('/api/wishlist/create', {
                //     customerId,
                //     productId: product.id,
                // });
                setShowWishListModal(true);
                const response = await fetch('/api/wishlist/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain', // Change the Content-Type to text/plain
                    },
                    body: JSON.stringify({
                        customerId,
                        productId: product.id,
                    }),
                });

                console.log('Wishlist item created:', response.data);
                console.log("Added to Wishlist");

                // Dispatch action to add product to Redux store


                dispatch(addProductToWishList(productWithTimestamp));

                // Show the wishlist modal

            } catch (error) {
                console.error('Failed to add product to database wishlist:', error);
            }
        } else {
            // If customerId is empty, only update Redux store and show modal
            dispatch(addProductToWishList(productWithTimestamp));
            setShowWishListModal(true);
        }
    };

    const handleAddCartModalClose = () => {
        setShowAddCartModal(false);
    };

    const handleWishListModalClose = () => {
        setShowWishListModal(false);
    };



    const amount = product?.variants[0]?.prices[0]?.amount
    const amountPKR = amount ? amount : 0;

    const isProductInWishList =
        product?.addedInWishList === "yes" ||
        wishList.some(item => item.id === product.id);

    // Determine icon and click handler
    const heartIcon = isProductInWishList ? FilledHeart : Heart;
    const handleIconClick = isProductInWishList ? null : handleWishListModalOpen;


    const truncateTitle = (title) => {
        if (title.length > 70) {
            return title.substring(0, 70) + '...';
        }
        return title;
    };


    const handleCardClick = () => {
        dispatch(selectProduct(product))
        router.push(`/product-detail`);
    };


    return (
        <div style={{ padding: "0.4rem" }}>
            <Box sx={{ ...RegistrationStyles.formBox, ...ServiceCardStyles.cardBox, ...ProductCardStyles.cardBox }} onClick={handleCardClick}>
                <Box sx={ProductCardStyles.heartBox}>
                    {/* <Image src={heartIcon} width={25} onClick={handleIconClick} /> */}
                    {isProductInWishList ? <FavoriteIcon sx={{ color: "var(--primary-color)", width: 25 }} /> : <FavoriteBorderIcon sx={{ color: "#AAAAAA", width: 25 }} onClick={handleIconClick} />}
                </Box>
                <img src={product?.thumbnail} alt={product?.title} width={108} height={108} />
                {/* <Img src={Product} alt={product.title} /> */}
                <Image src={Line} />


                {/* <Box sx={{ ...ProductCardStyles.contentBox, width: "80%", justifyContent: "space-between" }}>
                    <Box sx={ProductCardStyles.descriptionBox}>
                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, fontSize: "0.9rem" }}>
                            {truncateTitle(product?.title)}
                        </Typography>
                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont }}>
                            Rs {amountPKR.toFixed(2)}
                        </Typography>
                    </Box>
                    <Box sx={ProductCardStyles.iconsBox}>
                        <Image src={CartIcon} style={{ cursor: "pointer" }} onClick={handleAddCartModalOpen} />
                        <Box sx={ProductCardStyles.ratingBox}>
                            <Image src={Star} />
                            <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.typoFont }}>
                                {product?.rating || "4.5"}
                            </Typography>
                        </Box>
                    </Box>
                </Box> */}


                <Box sx={{ ...ProductCardStyles.contentBox, flexDirection: "column", width: "100%", gap: "1rem" }}>
                    <Box sx={ProductCardStyles.descriptionBox}>
                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, fontSize: "0.78rem" }}>
                            {truncateTitle(product?.title)}
                        </Typography>
                    </Box>
                    <Box sx={{ ...ProductCardStyles.iconsBox, flexDirection: "row", alignItems: "center", gap: "3rem" }}>
                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont, fontSize: "0.85rem", marginLeft: "-1rem" }}>
                            Rs {amountPKR.toFixed(2)}
                        </Typography>
                        <Box sx={{ marginLeft: "-1rem" }}>
                            <Image src={CartIcon} style={{ cursor: "pointer", width: 24, }} onClick={handleAddCartModalOpen} />
                        </Box>
                        <Box sx={ProductCardStyles.ratingBox}>
                            <Image src={Star} />
                            <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.typoFont, fontSize: "0.85rem" }}>
                                {`${product?.averageRating || "5"}`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>




            </Box>
            {showAddCartModal && (
                <AddCartModal
                    open={handleAddCartModalOpen}
                    handleAddCartModalClose={handleAddCartModalClose}
                    handleAddCart={handleAddCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    productTitle={product.title}
                />
            )}
            {showWishListModal && (
                <WishListModal
                    open={handleWishListModalOpen}
                    handleWishListModalClose={handleWishListModalClose}
                    handleWishList={handleWishList}
                    handleRemoveFromWishList={handleRemoveFromWishList}
                    productTitle={product.title}
                />
            )}
        </div>
    )
}


export default ProductCard
