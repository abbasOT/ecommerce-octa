"use client";

import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { styles } from "../../Ui/Styles/SecondaryStyles";
import { FAQsStyles, FooterMainStyles, MyAccountStyles } from "@/components/Ui/Styles/Styles";
import Image from "next/image";
import Emptycart from "../../Ui/Assets/AddToCart/ShoppingEmptyCart.svg"


export default function EmptyShoppingCart() {
  return (
    <Box sx={styles.emptyShppingCartContainerBox}>
      <Typography sx={FAQsStyles.title}>Shopping Cart</Typography>
      <Box sx={{ ...MyAccountStyles.emptyHistoryImageBox, p: 2 }}>
        <Image src={Emptycart} alt="Empty Cart" />
      </Box>
      <Typography sx={{ ...MyAccountStyles.orderPriceTypo, ...styles.emprtyShoppingCartSubtitleTypo }}  >
        Your cart is empty. Let&apos;s change that
      </Typography>
      <Typography sx={{ ...styles.udtxt, mt: -4 }}>Continue Shopping!</Typography>
    </Box>
  );
}
