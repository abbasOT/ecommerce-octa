"use client"
import React, { useState } from 'react'
import { RegistrationStyles, ServiceCardStyles, WhyChooseUsStyles, ProductCardStyles } from '@/components/Ui/Styles/Styles'
import { Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { addProductToCart, addProductToWishList, selectProduct, removeProductFromCart, removeProductFromWishList } from '../../../redux/slices/productSlice';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Heart from "../../Ui/Assets/Home/cartHeart.svg"
import Line from "../../Ui/Assets/Home/cartLine.svg"
import CartIcon from "../../Ui/Assets/Home/cartIcon.svg"
import Star from "../../Ui/Assets/Home/Star.svg"
import AddCartModal from '@/components/Ui/Dialogues/AddCart'
import WishListModal from '@/components/Ui/Dialogues/WishList'
import { useSelector } from 'react-redux';
import axios from 'axios';

function ProductCard({ product }) {

    const customerId = useSelector((state) => state.medusaConfig.customer_id);
    const [showAddCartModal, setShowAddCartModal] = useState(false);
    const [showWishListModal, setShowWishListModal] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

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
        router.push(`/my-account?activeComponent=Wishlist`);

    };
    const handleRemoveFromWishList = () => {
        console.log("Removed from Wishlist");
        dispatch(removeProductFromWishList(product.id));
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
        if (customerId !== "") {
            try {
                // API call to add product to wishlist
                // const response = await axios.post('/api/wishlist/create', {
                //     customerId,
                //     productId: product.id,
                // });
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
                dispatch(addProductToWishList(product));

                // Show the wishlist modal
                setShowWishListModal(true);
            } catch (error) {
                console.error('Failed to add product to database wishlist:', error);
            }
        } else {
            // If customerId is empty, only update Redux store and show modal
            dispatch(addProductToWishList(product));
            setShowWishListModal(true);
        }
    };

    const handleAddCartModalClose = () => {
        setShowAddCartModal(false);
    };

    const handleWishListModalClose = () => {
        setShowWishListModal(false);
    };

    const handleCardClick = () => {
        dispatch(selectProduct(product))
        router.push(`/product-detail`);
    };

    const amount = product?.variants[0]?.prices[0]?.amount
    const amountPKR = amount ? amount * 280 : 0;


    return (
        <div style={{ padding: "1rem" }}>
            <Box sx={{ ...RegistrationStyles.formBox, ...ServiceCardStyles.cardBox, ...ProductCardStyles.cardBox }} onClick={handleCardClick}>
                <Box sx={ProductCardStyles.heartBox}>
                    <Image src={Heart} width={25} onClick={handleWishListModalOpen} />
                </Box>
                <img src={product?.thumbnail} alt={product?.title} width={108} height={108} />
                {/* <Img src={Product} alt={product.title} /> */}
                <Image src={Line} />
                <Box sx={{ ...ProductCardStyles.contentBox, width: "80%", justifyContent: "space-between" }}>
                    <Box sx={ProductCardStyles.descriptionBox}>
                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo }}>
                            {product?.title}
                        </Typography>
                        <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...ProductCardStyles.typoFont }}>
                            {/* ${product?.variants[0]?.prices[0]?.amount} */}
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
