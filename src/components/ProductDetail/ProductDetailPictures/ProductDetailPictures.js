"use client";

import { Grid } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { styles } from "../../Ui/Styles/SecondaryStyles";


export default function ProductDetailPictures() {
  const product = useSelector((state) => state.product.selectedProduct);
  return (
    <div>
      <Grid >
        <Box sx={styles.imgbox}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Box sx={styles.productDetailsPrimaryImg}>
              <img
                src={product?.thumbnail}
                alt=""
                style={{ width: "200px" }}
              />
            </Box>
          </Grid>
          <Grid mt={1} >
            <Box spacing={1} sx={styles.productDetailsSecondaryImagesBoxContainer}>
              {product?.images?.slice(0, 3).map((image, index) => (
                <Box key={index} sx={styles.productDetailsSecondaryImagesBox}>
                  <img
                    src={image.url}
                    alt=""
                    style={styles.productDetailsSecondaryImages}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}


