"use client";

import { Button, Grid, Typography, Box, Divider } from "@mui/material";
import { styles } from "../../Ui/Styles/SecondaryStyles";
import { orderStatusCardStyles, FooterMainStyles, ContactFormStyles, MyAccountStyles } from "@/components/Ui/Styles/Styles";
import { addProductToCart, addProductToWishList, removeProductFromCart, removeProductFromWishList } from '../../../redux/slices/productSlice';
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Heart from "../../Ui/Assets/Shop/Heart.svg"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import CountButton from "../ProductDetailButtons/CountButton";
import Image from "next/image";
import WishListButton from "../ProductDetailButtons/WishlistButton";
import WishListModal from "@/components/Ui/Dialogues/WishList";
import AddCartModal from "@/components/Ui/Dialogues/AddCart";

export default function ProductDetailActionBtns() {


  const customerId = useSelector((state) => state.medusaConfig.customer_id);
  const product = useSelector((state) => state.product.selectedProduct);
  const cart = useSelector((state) => state.product.cart)
  const wishList = useSelector((state) => state.product.wishList);
  const categoriesWithProducts = useSelector((state) => state.categories.allCategoriesWithProducts);
  const [showWishListModal, setShowWishListModal] = useState(false);
  const [showAddCartModal, setShowAddCartModal] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();


  const handleQuantityChange = (newQuantity) => {
    setTotalQuantity(newQuantity);

  };

  const isProductInWishList =
    product?.addedInWishList === "yes" ||
    wishList.some(item => item.id === product.id);


  const now = new Date();
  const formattedDate = now.toISOString();


  const handleAddCart = () => {
    setShowAddCartModal(false);
    router.push(`/add-to-cart`);
  };
  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(product?.id));
    setShowAddCartModal(false);
  };

  // const handleAddCartModalOpen = () => {
  //   if (product?.id) {
  //     router.push(`/add-to-cart`);
  //   } else {
  //     dispatch(addProductToCart(product));
  //     setShowAddCartModal(true);
  //   }
  // };

  const handleAddCartModalOpen = () => {
    console.log(totalQuantity, "the product quantity commig from counter")
    dispatch(addProductToCart({ ...product, quantity: totalQuantity }));

    router.push(`/add-to-cart`);


    // // Check if the cart is empty or null
    // if (!cart || cart.length === 0) {
    //   // If cart is empty, add product to cart and open modal
    //   dispatch(addProductToCart(product));
    //   setShowAddCartModal(true);
    // } else {
    //   // Check if the product is already in the cart
    //   const productInCart = cart.find((cartProduct) => cartProduct.id === product?.id);

    //   if (productInCart) {
    //     // If the product exists in the cart, navigate to add-to-cart page
    //     router.push(`/add-to-cart`);
    //   } else {
    //     // If the product doesn't exist in the cart, add it and show modal
    //     dispatch(addProductToCart(product));
    //     setShowAddCartModal(true);
    //   }
    // }


  };





  const handleAddCartModalClose = () => {
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

  const handleWishListModalOpen = async () => {
    const productWithTimestamp = {
      ...product,
      createdAt: formattedDate
    };
    if (customerId !== "") {
      try {
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

  const handleWishListModalClose = () => {
    setShowWishListModal(false);
  };



  const getCategoriesForProduct = (productId, categories) => {
    return categories
      .filter(category => category?.product_id === productId) // Match product_id with product.id
      .map(category => category?.product_category?.name); // Extract the category names
  };

  // Get category names for the selected product
  const productCategories = getCategoriesForProduct(product?.id, categoriesWithProducts);

  console.log(productCategories, "the categories names array i am loking for ")

  const tags = product?.tags.map(tag => tag.value).join(", ") || "No tags available";
  const categories = productCategories.join(", ") || "No categories available";

  console.log(categories, "the categories names i am loking for ")
  const amount = product?.variants[0]?.prices[0]?.amount
  const amountPKR = amount ? amount : 0;

  const productDetails = [
    { label: "Tags", value: tags },
    { label: "Category", value: categories },
  ];


  const truncateTitle = (title) => {
    if (title?.length > 55) {
      return title.substring(0, 55) + '...';
    }
    return title;
  };


  return (
    <div>
      <Box
        sx={styles.productDetailsActionBtnsContainerBox}
      >
        <Grid sx={styles.ordr1}>
          <Box
            sx={styles.productDetailsActionBtnsIconsBox}
          >
            <Box sx={styles.ordrfl}>
              <Inventory2OutlinedIcon sx={styles.ordricn} />
              <Typography sx={styles.ordrfnt}>Stock</Typography>
            </Box>
            <Box sx={styles.ordrfl}>
              <VerifiedOutlinedIcon sx={styles.ordricn} />
              <Typography sx={styles.ordrfnt}>Guranteed</Typography>
            </Box>
            <Box sx={styles.ordrfl}>
              <LocalShippingOutlinedIcon sx={styles.ordricn} />
              <Typography sx={styles.ordrfnt}>Free Delivery</Typography>
            </Box>
          </Box>

          <Typography sx={styles.prnm}>{truncateTitle(product?.title)}</Typography>

          <Box sx={styles.ordrfl}>
            <Rating
              name="half-rating-read"
              defaultValue={product?.averageRating || 4.5}
              precision={0.5}
              readOnly
            />
            <Typography sx={styles.ordrrw} lg={2}>
              {product?.totalReviews || 0} Reviews Given
            </Typography>
          </Box>

          <Box sx={styles.ordrfl}>
            <Typography sx={styles.bold}>Rs: {amountPKR.toFixed(2)}/-</Typography>
          </Box>

          <Box container sx={styles.ordrfl}>
            <Box sx={{ ...styles.ordrfl, gap: "1rem" }}>
              <CountButton product={product} initialQuantity={1} onQuantityChange={handleQuantityChange} />
              <Button variant="contained" onClick={handleWishListModalOpen} sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, ...MyAccountStyles.viewItemButton, padding: "0.5rem 2rem", }}
                // disabled={product?.addedInWishList === "yes"}
                disabled={isProductInWishList}
                startIcon={<Image src={Heart} />}>Add to Wishlist</Button>
              {/* <WishListButton /> */}
            </Box>
          </Box>

          <Box sx={styles.ordrpd}>
            <Button variant="contained" onClick={handleAddCartModalOpen} sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, width: "100%", maxWidth: 340 }} >Add to Cart</Button>
          </Box>

          <Divider
            sx={styles.productDetailsActionBtnsDividerStyle}
          ></Divider>
          <Box
            sx={{
              ...orderStatusCardStyles.orderCompleteDetailContainer,
              minWidth: "300px", maxWidth: "500px",
            }}
          >
            <Box sx={orderStatusCardStyles.orderCompleteDetailBox}>
              {productDetails.map((detail, index) => (
                <Typography key={index} sx={orderStatusCardStyles.textStyle}>
                  {detail.label}
                </Typography>
              ))}
            </Box>
            <Box sx={orderStatusCardStyles.orderCompleteDetailBox}>
              {productDetails.map((detail, index) => (
                <Typography
                  key={index}
                  sx={{
                    ...orderStatusCardStyles.orderDetailValueColor,
                    ...orderStatusCardStyles.textStyle,
                  }}
                >
                  {detail.value}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
      </Box>


      {showWishListModal && (
        <WishListModal
          open={handleWishListModalOpen}
          handleWishListModalClose={handleWishListModalClose}
          handleWishList={handleWishList}
          handleRemoveFromWishList={handleRemoveFromWishList}
          productTitle={product?.title}
        />
      )}
      {showAddCartModal && (
        <AddCartModal
          open={handleAddCartModalOpen}
          handleAddCartModalClose={handleAddCartModalClose}
          handleAddCart={handleAddCart}
          handleRemoveFromCart={handleRemoveFromCart}
          productTitle={product?.title}
        />
      )}
    </div>
  );
}
