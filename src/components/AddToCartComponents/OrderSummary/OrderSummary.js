"use client"
import { Grid, Typography, TextField, InputAdornment, Button, Paper } from '@mui/material'
import React from 'react'
import { styles } from '../../Ui/Styles/SecondaryStyles';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function OrderSummary({ cartItems, subtotal, tax, ship, total, isDisabled }) {
    const router = useRouter();

    const customerId = useSelector((state) => state.medusaConfig.customer_id);
    const handleCheckout = () => {
        if (customerId === "") {
            console.log("Customer ID is missing. Cannot proceed with order creation.");
            alert("Please log in to create an order.");
            router.push('/login');
        }
        else {
            router.push('/order-detail');
        }
    };

    const handleShopping = () => {
        router.push('/shop');
    };


    return (
        <div>
            <Paper sx={styles.paperStyle}>
                <Grid item sx={styles.section2} >
                    <Typography style={styles.bold}>Order Summary</Typography>
                    <Typography style={styles.colsptxt}>Discount Code/Promo Code</Typography>
                    <TextField placeholder='Code' sx={styles.txtfld} disabled={isDisabled} />
                    <Typography style={styles.colsptxt}>Your bonus card number</Typography>
                    <TextField
                        placeholder="Enter card Number"
                        sx={styles.txtfld}
                        disabled={isDisabled}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button variant="contained" style={styles.apbtn} disabled={isDisabled}>
                                        Apply
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Grid style={{ ...styles.content, paddingTop: "2rem" }}>
                        <Typography style={styles.boldfont2}>Subtotal</Typography>
                        <Typography style={styles.boldfont2}>${isDisabled ? "0" : subtotal}</Typography>
                    </Grid>

                    <Grid style={styles.content}>
                        <Typography style={styles.estmtxt}>Estimated Tax</Typography>
                        <Typography style={styles.boldfont2}>${isDisabled ? "0" : tax.toFixed(2)}</Typography>
                    </Grid>

                    <Grid style={styles.content}>
                        <Typography style={styles.estmtxt}>Estimated shipping & handling</Typography>
                        <Typography style={styles.boldfont2}>${isDisabled ? "0" : ship}</Typography>
                    </Grid>

                    <Grid style={styles.content}>
                        <Typography style={styles.boldfont2}>Total</Typography>
                        <Typography style={{ ...styles.boldfont2, color: 'var(--primary-color)' }}>${isDisabled ? "0" : total}</Typography>
                    </Grid>
                    <Grid container sx={styles.btncont}>
                        <Button variant="contained" sx={styles.btn} disabled={isDisabled} onClick={handleCheckout}>
                            Checkout
                        </Button>
                        <Typography style={styles.udtxt} onClick={handleShopping}>Continue Shopping</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
