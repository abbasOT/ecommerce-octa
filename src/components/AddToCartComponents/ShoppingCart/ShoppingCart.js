"use client"

import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Divider, Typography } from '@mui/material';
import { styles } from '../../Ui/Styles/SecondaryStyles';
import { MyAccountStyles } from '@/components/Ui/Styles/Styles';
import CloseIcon from '@mui/icons-material/Close';
import DeviceImg from "../../Ui/Assets/AddToCart/DeviceImg.svg";
import AddToCart from "../../Ui/Assets/AddToCart/ShoppingEmptyCart.svg"
import Image from 'next/image';

export default function ShoppingCart({ cartItems, handleUpdateQuantity, }) {

    return (
        <>
            <Box style={styles.pd}>
                <Typography sx={styles.bold}>Shopping Cart</Typography>
                {cartItems.map((product, index) => {
                    const productTotal = (product.variants[0].prices[0].amount / 100) * product.quantity;

                    return (
                        <React.Fragment key={index}>
                            <Box sx={styles.boxin}>
                                <Box sx={{ ...MyAccountStyles.firstBox, m: "1rem 0rem" }}>
                                    <Box>
                                        <img src={product.thumbnail} width={80} alt="Order Image" />
                                    </Box>
                                    <Box sx={styles.orderTrackSummaryCardPrductTypoBox}>
                                        <Typography sx={{ ...styles.bold, ...styles.typoFont }}>
                                            {product.title}
                                        </Typography>
                                        <Typography sx={styles.orderTrackSummaryCardTotalItems}>
                                            {product.quantity} item{product.quantity > 1 ? 's' : ''}
                                        </Typography>
                                    </Box>
                                </Box>
                                <div style={styles.box2}>
                                    <Button sx={styles.addremoveButton} onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}>-</Button>
                                    <Box sx={styles.qtyBox}>
                                        <Typography style={styles.qty}>{product.quantity}</Typography>
                                    </Box>
                                    <Button sx={styles.addremoveButton} onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}>+</Button>
                                </div>
                                <div style={styles.box3}>
                                    <Typography sx={styles.bold}>${productTotal.toFixed(2)}</Typography>
                                    <CloseIcon style={styles.cancel} onClick={() => handleUpdateQuantity(product.id, 0)} />
                                </div>
                            </Box>
                            <Divider sx={styles.shopCartDividerStyles}></Divider>
                        </React.Fragment>
                    );
                })}

            </Box>
        </>
    );
}


