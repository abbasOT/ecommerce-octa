"use client"
import { Grid, Typography, TextField, InputAdornment, Button, Paper, cardActionAreaClasses, CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { styles } from '../../Ui/Styles/SecondaryStyles';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import medusa from '@/medusaClient';
import { updateOrderValue } from '@/redux/slices/orderSlice';


export default function OrderSummary({ subtotal, tax, ship, total, isDisabled }) {
    const router = useRouter();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);

    const customerId = useSelector((state) => state.medusaConfig.customer_id);
    const cartItems = useSelector((state) => state.product.cart);
    const orderDetails = useSelector((state) => state.order);
    const lineItems = orderDetails?.items
    const [cart, setCart] = useState(null);
    const [regions, setRegions] = useState([]);

    dispatch(updateOrderValue({ name: 'items', value: cartItems }));


    // Fetch all regions when the component mounts
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await medusa.regions.list(); // Replace with your actual API call to get regions
                setRegions(response.regions); // Adjust according to the API response structure
            } catch (error) {
                console.error("Error fetching regions:", error);
                // Handle the error (e.g., display a message to the user)
            }
        };

        fetchRegions();
    }, []);

    // Function to retrieve the cart from the API
    const retrieveCart = async (id) => {
        try {
            const { cart } = await medusa.carts.retrieve(id);
            setCart(cart);
        } catch (error) {
            console.error("Error retrieving cart:", error);
            // Handle the error (e.g., display a message to the user)
        }
    };

    const cartId = typeof window !== 'undefined' ? localStorage.getItem("cart_id") : null;

    useEffect(() => {
        if (cartId) {
            retrieveCart(cartId);
        }
    }, [cartId]);

    // Function to create or update a cart with a specific region ID
    const createOrUpdateCart = async (regionId) => {
        setLoading(true);
        try {
            if (cartId) {
                // If the cart ID exists, update the existing cart with new line items
                await addLineItemsToCart(cartId);
            } else {
                // If no cart ID exists, create a new cart
                const { cart } = await medusa.carts.create({ region_id: regionId });

                if (typeof window !== 'undefined') {
                    localStorage.setItem("cart_id", cart.id);
                }
                // Now, await the result of adding line items to ensure it completes
                await addLineItemsToCart(cart.id);
            }
            alert("Your cart has been updated.");
            setLoading(false); // Stop loading when done
            router.push('/order-detail');

        } catch (error) {
            console.error("Error creating or updating cart:", error);
            setLoading(false); // Stop loading when done

            // Handle the error (e.g., display a message to the user)
        }
    };

    // Function to add line items to the cart
    const addLineItemsToCart = async (cartId) => {
        try {
            for (const item of lineItems) {
                const variantId = item.variants[0].id; // Example, use the correct variant ID
                const quantity = item.quantity;

                await medusa.carts.lineItems.create(cartId, {
                    variant_id: variantId,
                    quantity: quantity,
                });
            }

        } catch (error) {
            console.error("Error adding line items to cart:", error);
            setLoading(false); // Stop loading when done

            // Handle the error (e.g., display a message to the user)
        }
    };

    const handleCheckout = async () => {

        if (customerId === "") {
            console.log("Customer ID is missing. Cannot proceed with order creation.");
            alert("Please log in to create an order.");
            router.push('/login');
        } else {
            if (regions.length > 0) {
                const regionId = regions[0].id; // Choose the appropriate region ID
                createOrUpdateCart(regionId);
            } else {
                console.error("No regions available to create a cart.");
            }
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
                        <Typography style={styles.boldfont2}>Rs {isDisabled ? "0" : subtotal}</Typography>
                    </Grid>

                    <Grid style={styles.content}>
                        <Typography style={styles.estmtxt}>Estimated Tax</Typography>
                        <Typography style={styles.boldfont2}>Rs {isDisabled ? "0" : tax.toFixed(2)}</Typography>
                    </Grid>

                    <Grid style={styles.content}>
                        <Typography style={styles.estmtxt}>Estimated shipping & handling</Typography>
                        <Typography style={styles.boldfont2}> Rs {isDisabled ? "0" : ship}</Typography>
                    </Grid>

                    <Grid style={styles.content}>
                        <Typography style={styles.boldfont2}>Total</Typography>
                        <Typography style={{ ...styles.boldfont2, color: 'var(--primary-color)' }}> Rs {isDisabled ? "0" : total}</Typography>
                    </Grid>
                    <Grid container sx={styles.btncont}>
                        <Button variant="contained" sx={styles.btn} disabled={isDisabled || loading} onClick={handleCheckout}>
                            {loading ? <CircularProgress size={24} sx={{ color: "#FFF" }} /> : "Checkout"}
                        </Button>
                        <Typography style={styles.udtxt} onClick={handleShopping}>Continue Shopping</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
