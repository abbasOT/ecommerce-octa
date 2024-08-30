"use client"

import { Grid, } from '@mui/material'
import React, { useState } from 'react'
import { styles } from '../../Ui/Styles/SecondaryStyles';
import { useSelector, useDispatch } from 'react-redux';
import { FooterMainStyles, ContactFormStyles } from '@/components/Ui/Styles/Styles';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import OrderSummary from '../OrderSummary/OrderSummary';
import EmptyShoppingCart from '../EmptyShoppingCart/EmptyShoppingCart';
import { updateProductQuantity, removeProductFromCart } from '../../../redux/slices/productSlice';


export default function AddToCartMain() {


    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.product.cart);

    const handleUpdateQuantity = (productId, quantity) => {
        if (quantity === 0) {
            dispatch(removeProductFromCart(productId));
        } else {
            dispatch(updateProductQuantity({ id: productId, quantity }));
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.variants[0].prices[0].amount / 100 * item.quantity), 0);
    const tax = subtotal * 0.2; // Assume 20% tax
    const ship = 29; // Fixed shipping cost
    const total = subtotal + tax + ship;

    return (
        <div>
            <Grid container lg={12} md={12} sm={12} xs={12} sx={styles.main}>
                <Grid item xs={12} sm={12} md={12} lg={6} sx={{ display: "flex", justifyContent: cartItems.length < 1 ? "center" : { lg: "end", xs: "center" } }} >
                    {cartItems.length > 0 ? (
                        <ShoppingCart cartItems={cartItems} handleUpdateQuantity={handleUpdateQuantity} />
                    ) : (
                        <EmptyShoppingCart />
                    )}
                </Grid>

                <Grid xs={12} sm={12} md={12} lg={6} sx={{ display: "flex", justifyContent: { lg: "start", xs: "center" }, }} >
                    <OrderSummary cartItems={cartItems} subtotal={subtotal} tax={tax} ship={ship} total={total} isDisabled={cartItems.length > 0 ? 0 : 1} />
                </Grid>
            </Grid>


        </div >
    )
}
