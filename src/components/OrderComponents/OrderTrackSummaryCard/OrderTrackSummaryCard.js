"use client"

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Paper, Box, Divider, CircularProgress } from '@mui/material';

import { MyAccountStyles } from '@/components/Ui/Styles/Styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderValue } from '@/redux/slices/orderSlice';
import { styles } from '../../Ui/Styles/SecondaryStyles';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import medusa from '@/medusaClient';
import { clearCart } from '@/redux/slices/productSlice';
function OrderTrackSummaryCard() {

    const dispatch = useDispatch()
    const router = useRouter()
    const cartId = typeof window !== 'undefined' ? localStorage.getItem("cart_id") : null;
    const subTotalAmount = useSelector((state) => state.order.subTotalAmount);
    const cartItems = useSelector((state) => state.product.cart);
    const [loading, setLoading] = useState(false);



    // const medusa = useSelector((state) => state.medusaConfig.medusa);


    const orderDetails = useSelector((state) => state.order);
    // const subtotal = cartItems.reduce((sum, item) => sum + ((item.variants[0].prices[0].amount * 280) * (item.quantity)), 0);
    const subtotal = subTotalAmount
    const ship = 0; // Fixed the shipping cost
    const price = subtotal + ship;
    const discount = price * 0.10
    const totalPrice = price - discount

    dispatch(updateOrderValue({ name: 'totalAmount', value: totalPrice }));


    const summaryDetails = [
        { label: 'Subtotal', value: `Rs ${subtotal}` },
        { label: 'Shipping', value: '-' },
        { label: 'Price', value: `Rs ${price}` },
        { label: 'Discount 10%', value: `-Rs ${discount.toFixed(2)}` },
        { label: 'Total Price', value: `Rs ${totalPrice}`, color: 'var(--primary-color)' },
    ];

    console.log(orderDetails, "the orderDetails are..")

    const customerId = orderDetails?.customerId

    const handleCompletePurchase = async () => {

        const { firstName, lastName, streetAddress, city, state, zipCode, phone, paymentMethod, email, paymentSecreenShotURL } = orderDetails;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation: Check if any required field is empty
        if (!firstName || !lastName || !streetAddress || !city || !state || !zipCode || !phone || !paymentMethod) {
            Swal.fire({
                title: "Error",
                text: "Please fill in all required fields",
                icon: "warning",
                button: "OK",
            });
            return; // Stop further execution if validation fails
        }
        if (!emailRegex.test(email)) {
            Swal.fire({
                title: "Invalid Email",
                text: "Please enter a valid email address",
                icon: "warning",
                button: "OK",
            });
            return; // Stop further execution if validation fails
        }

        // Validation: Check if payment screenshot URL is empty
        if (!paymentSecreenShotURL) {
            Swal.fire({
                title: "Payment Screenshot Required",
                text: "Please upload a screenshot of your payment",
                icon: "warning",
                button: "OK",
            });
            return; // Stop further execution if validation fails
        }

        setLoading(true);
        try {

            // Step 1: Update Shipping Address
            const { cart: updatedCart } = await medusa.carts.update(cartId, {
                shipping_address: {
                    company: "Octathorn", // Ensure this is correct
                    first_name: orderDetails.firstName,
                    last_name: orderDetails.lastName,
                    address_1: orderDetails.streetAddress,
                    address_2: orderDetails.streetAddress, // Optional
                    city: orderDetails.city,
                    country_code: "pk", // Pakistan ISO 2-letter country code
                    province: orderDetails.state,
                    postal_code: orderDetails.zipCode,
                    phone: orderDetails.phone,
                    metadata: {
                        paymentMethod: orderDetails.paymentMethod, // Example metadata field
                        paymentSecreenShot: orderDetails.paymentSecreenShotURL, // Add more fields if necessary
                    },
                },
            });

            console.log("Updated shipping address:", updatedCart.shipping_address);

            // Step 2: Retrieve Shipping Options
            const { shipping_options } = await medusa.shippingOptions.listCartOptions(cartId);

            console.log("Shipping options returned:", shipping_options);

            // if (shipping_options.length === 0) {
            //     console.error("No shipping options available");
            //     alert("No shipping options are available for your location. Please try again.");
            //     return;
            // }

            // Step 3: Add the Selected Shipping Option
            const selectedShippingOption = shipping_options[0]?.id; // Assuming the first option is valid
            const { cart: finalCart } = await medusa.carts.addShippingMethod(cartId, {
                option_id: selectedShippingOption || "so_01J6W07C6XVHQWGWNRV69TP12X",
            });

            console.log("Selected shipping methods:", finalCart.shipping_methods);

            // Step 4: Create Payment Sessions for the Cart
            const { cart: cartWithPaymentSessions } = await medusa.carts.createPaymentSessions(cartId);
            const paymentSessions = cartWithPaymentSessions.payment_sessions;

            if (!paymentSessions || paymentSessions.length === 0) {
                console.error('No payment providers available.');
                alert("No payment providers are available. Please try again later.");
                return;
            }

            // Step 5: Set the Payment Session
            // Assuming 'manual' is a valid provider_id
            const selectedPaymentProvider = paymentSessions.find(session => session.provider_id === 'manual')?.provider_id;

            if (!selectedPaymentProvider) {
                console.error('Manual payment provider not found.');
                alert("No manual payment provider is available. Please try again later.");
                return;
            }

            const { cart: cartWithPaymentSession } = await medusa.carts.setPaymentSession(cartId, {
                provider_id: selectedPaymentProvider,
            });

            console.log('Selected payment provider:', cartWithPaymentSession.payment_session);

            console.log(cartWithPaymentSession, "the cart ready for the purchase")

            // Step 6: Complete the Purchase
            const { type, data } = await medusa.carts.complete(cartId);
            console.log('Order completed:', type, data);

            // Show a success alert when the purchase is completed

            // alert("Your order has been successfully completed!");
            Swal.fire({
                title: 'Order Completed',
                text: 'Your order has been successfully completed!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setLoading(false);
                localStorage.removeItem("cart_id");
                // Handle successful completion (e.g., navigate to order confirmation page)
                router.push('/order/complete');
            });

        } catch (error) {
            console.error("Error completing purchase:", error);
            // alert("Error occur while completing your purchase. Please try again with new cart.");
            Swal.fire({
                title: 'Error',
                text: 'Error occur while completing your purchase. Please try again with new cart.',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                setLoading(false);
                localStorage.removeItem("cart_id");
                router.push('/order/failed');
            });
        }
    };




    const truncateTitle = (title) => {
        if (title.length > 35) {
            return title.substring(0, 35) + '...';
        }
        return title;
    };


    return (
        <div>
            <Paper sx={styles.orderTrackSummaryCardPaper}>
                <Grid item sx={styles.section2}>
                    <Typography sx={styles.orderTrackSummaryCardTitle}>YOUR ORDER</Typography>
                    <Typography sx={styles.orderTrackSummaryCardSubtitle}>Review all the products you want to buy</Typography>
                    {cartItems.map((item, index) => (
                        <Box key={index} sx={{ ...MyAccountStyles.firstBox, m: "1rem 0rem" }}>
                            <Box>
                                <img src={item.thumbnail} width={80} alt="Order Image" />
                            </Box>
                            <Box sx={styles.orderTrackSummaryCardPrductTypoBox}>
                                <Typography sx={{ ...styles.bold, ...styles.typoFont }}>
                                    {truncateTitle(item?.title)}
                                </Typography>
                                <Typography sx={styles.orderTrackSummaryCardTotalItems}>
                                    {item.quantity} item{item.quantity > 1 ? 's' : ''}
                                </Typography>
                                <Typography sx={{ ...styles.boldfont2 }}>
                                    Rs {((item.variants[0].prices[0].amount) * (item.quantity)).toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    ))}

                    <Divider sx={styles.orderTrackSummaryCardDivider}></Divider>
                    {summaryDetails.map((detail, index) => (
                        <Box key={index} style={{ ...styles.content, paddingTop: index === 0 ? "2rem" : "0" }}>
                            <Typography style={styles.estmtxt}>{detail.label}</Typography>
                            <Typography style={{ ...styles.boldfont2, color: detail.color || 'inherit' }}>{detail.value}</Typography>
                        </Box>
                    ))}
                    <Grid container sx={styles.btncont}>

                        {/* <Button variant="contained" sx={{ ...styles.btn, width: "90%" }} onClick={handleShippingSetup}>
                            Add Shipping Adress
                        </Button> */}

                        <Button variant="contained" sx={{ ...styles.btn, width: '90%' }} disabled={loading} onClick={handleCompletePurchase} >
                            {loading ? <CircularProgress size={24} sx={{ color: "#FFF" }} /> : "Complete Purchase"}
                        </Button>

                        <Typography onClick={() => router.push('/add-to-cart')} style={styles.udtxt}>Edit cart</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default OrderTrackSummaryCard;

