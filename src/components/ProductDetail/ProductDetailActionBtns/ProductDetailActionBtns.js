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

  const product = useSelector((state) => state.product.selectedProduct);
  const [showWishListModal, setShowWishListModal] = useState(false);
  const [showAddCartModal, setShowAddCartModal] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddCart = () => {
    setShowAddCartModal(false);
    router.push(`/add-to-cart`);
  };
  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(product?.id));
    setShowAddCartModal(false);
  };

  const handleAddCartModalOpen = () => {
    dispatch(addProductToCart(product));
    setShowAddCartModal(true);
  };

  const handleAddCartModalClose = () => {
    setShowAddCartModal(false);
  };

  const handleWishList = () => {
    setShowWishListModal(false);
    router.push(`/my-account?activeComponent=Wishlist`);
  };

  const handleRemoveFromWishList = () => {
    dispatch(removeProductFromWishList(product?.id));
    setShowWishListModal(false);
  };

  const handleWishListModalOpen = () => {
    dispatch(addProductToWishList(product));
    setShowWishListModal(true);
  };

  const handleWishListModalClose = () => {
    setShowWishListModal(false);
  };

  const tags = product?.tags.map(tag => tag.value).join(", ") || "No tags available";
  const amount = product?.variants[0]?.prices[0]?.amount
  const productDetails = [
    { label: "Tags", value: tags },
    { label: "Category", value: "Categories will be here" },
  ];

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

          <Typography sx={styles.prnm}>{product?.title}</Typography>

          <Box sx={styles.ordrfl}>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
            <Typography sx={styles.ordrrw} lg={2}>
              157 Reviews Given
            </Typography>
          </Box>

          <Box sx={styles.ordrfl}>
            <Typography sx={styles.bold}>Rs: {amount}/-</Typography>
          </Box>

          <Box container sx={styles.ordrfl}>
            <Box sx={{ ...styles.ordrfl, gap: "1rem" }}>
              <CountButton />
              <Button variant="contained" onClick={handleWishListModalOpen} sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, ...MyAccountStyles.viewItemButton, padding: "0.5rem 2rem", }} startIcon={<Image src={Heart} />}>Add to Wishlist</Button>
              {/* <WishListButton /> */}
            </Box>
          </Box>

          <Box sx={styles.ordrpd}>
            <Button variant="contained" onClick={handleAddCartModalOpen} sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, width: "100%" }} >Add to Cart</Button>
          </Box>

          <Divider
            sx={styles.productDetailsActionBtnsDividerStyle}
          ></Divider>
          <Box
            sx={{
              ...orderStatusCardStyles.orderCompleteDetailContainer,
              minWidth: "300px",
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
