"use client"

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Paper, Box, Divider } from '@mui/material';
import Medusa from "@medusajs/medusa-js";

import { MyAccountStyles } from '@/components/Ui/Styles/Styles';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderValue } from '@/redux/slices/orderSlice';
import { styles } from '../../Ui/Styles/SecondaryStyles';
import { useRouter } from 'next/navigation';
import medusa from '@/medusaClient';
function OrderTrackSummaryCard() {

    const dispatch = useDispatch()
    const router = useRouter()
    const cartItems = useSelector((state) => state.product.cart);

    dispatch(updateOrderValue({ name: 'items', value: cartItems }));
    // const medusa = useSelector((state) => state.medusaConfig.medusa);


    const orderDetails = useSelector((state) => state.order);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.variants[0].prices[0].amount / 100 * item.quantity), 0);
    const ship = 0; // Fixed the shipping cost
    const price = subtotal + ship;
    const discount = price * 0.10
    const totalPrice = price - discount

    dispatch(updateOrderValue({ name: 'totalAmount', value: totalPrice }));


    const summaryDetails = [
        { label: 'Subtotal', value: `$${subtotal}` },
        { label: 'Shipping', value: '-' },
        { label: 'Price', value: `$${price}` },
        { label: 'Discount 10%', value: `-$${discount.toFixed(2)}` },
        { label: 'Total Price', value: `$${totalPrice}`, color: 'var(--primary-color)' },
    ];


    console.log(orderDetails, "the orderDetails are..")

    const customerId = orderDetails?.customerId

    const [cart, setCart] = useState(null);
    const [regions, setRegions] = useState([]);
    const [isReadyToPurchase, setIsReadyToPurchase] = useState(false);

    // Retrieve line items from Redux
    const lineItems = orderDetails?.items

    console.log(lineItems, "the line itmes i am looking for")// Adjust based on your slice name

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

    // Function to create a cart with a specific region ID
    const createCart = async (regionId) => {
        try {
            const { cart } = await medusa.carts.create({ region_id: regionId });
            // Check if we're in a browser environment before accessing localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem("cart_id", cart.id);
            }
            setCart(cart);

            // Add line items to the cart
            await addLineItemsToCart(cart.id);
        } catch (error) {
            console.error("Error creating cart:", error);
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

            // Optionally, retrieve and update the cart after adding line items
            const { cart } = await medusa.carts.retrieve(cartId);
            setCart(cart);
        } catch (error) {
            console.error("Error adding line items to cart:", error);
            // Handle the error (e.g., display a message to the user)
        }
    };

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
    }, []);

    // Example usage: Assuming you want to create a cart with the first region's ID
    const handleCreateCart = () => {
        if (regions.length > 0) {
            const regionId = regions[0].id; // Choose the appropriate region ID
            createCart(regionId);
        } else {
            console.error("No regions available to create a cart.");
        }
    };


    const handleShippingSetup = async () => {
        try {
            // Step 1: Add Shipping Address
            const { cart: updatedCart } = await medusa.carts.update(cartId, {
                shipping_address: {
                    company: orderDetails.country,
                    first_name: orderDetails.firstName,
                    last_name: orderDetails.lastName,
                    address_1: orderDetails.streetAddress,
                    address_2: orderDetails.streetAddress,
                    city: orderDetails.city,
                    country_code: "pk", // Use ISO 2-letter country code
                    province: orderDetails.state,
                    postal_code: orderDetails.zipCode,
                    phone: orderDetails.phone,
                    metadata: {
                        paymentMethod: orderDetails.paymentMethod, // Example metadata field
                        ReferenceNumber: orderDetails.referenceNumber, // Add more fields if necessary
                    },
                },
            });

            console.log("Updated shipping address:", updatedCart.shipping_address);

            // Step 2: Retrieve Shipping Options
            const { shipping_options } = await medusa.shippingOptions.listCartOptions(cartId);

            if (shipping_options.length === 0) {
                console.error("No shipping options available");
                return;
            }

            // Select a shipping option (e.g., the first one or based on some criteria)
            const selectedOption = shipping_options[0]; // Choose the first option for simplicity

            // Step 3: Add the Selected Shipping Option
            const { cart: finalCart } = await medusa.carts.addShippingMethod(cartId, {
                option_id: selectedOption.id,
            });

            console.log("Selected shipping methods:", finalCart.shipping_methods);

            // Update the cart state
            setCart(finalCart);

        } catch (error) {
            console.error("Error setting up shipping:", error);
            // Handle the error (e.g., display a message to the user)
        }
    };


    console.log(cart, "you updated cart is this ...")

    useEffect(() => {
        const fetchAndSelectOptions = async () => {
            try {
                // Fetch shipping options
                const { shipping_options } = await medusa.shippingOptions.listCartOptions(cartId);
                if (shipping_options.length > 0) {
                    const selectedShippingOption = shipping_options[0].id;
                    console.log('Selected shipping option:', selectedShippingOption);

                    // Add Shipping Method
                    await medusa.carts.addShippingMethod(cartId, {
                        option_id: selectedShippingOption,
                    });
                    // Create payment sessions for the cart
                    const { cart } = await medusa.carts.createPaymentSessions(cartId);
                    const paymentSessions = cart.payment_sessions;

                    if (paymentSessions.length > 0) {
                        const selectedPaymentProvider = paymentSessions[0].provider_id;
                        console.log('Selected payment provider:', selectedPaymentProvider);

                        // Set Payment Session
                        await medusa.carts.setPaymentSession(cartId, {
                            provider_id: selectedPaymentProvider,
                        });

                        // Set the state to indicate readiness for purchase
                        setIsReadyToPurchase(true);
                    } else {
                        console.error('No payment providers available.');
                    }

                } else {
                    console.error('No shipping options available.');
                }
            } catch (error) {
                console.error('Error processing options:', error);
            }
        };

        fetchAndSelectOptions();
    }, [cartId]);



    const handleCompletePurchase = async () => {
        try {
            // Complete Cart
            const { type, data } = await medusa.carts.complete(cartId);
            console.log('Order completed:', type, data);

        } catch (error) {
            console.error('Error completing purchase:', error);
        }
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     createMedusaOrder(orderDetails);

    //     try {
    //         const response = await fetch('/api/customer_order/create', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(orderDetails),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             alert('Order created successfully');
    //             console.log('Order created successfully:', data);
    //         } else {
    //             const errorData = await response.json();
    //             alert('Error creating order: Please Fill any missing field');
    //             console.error('Error creating order:', errorData.error);

    //         }
    //     } catch (error) {
    //         console.error('Error creating order:', error);
    //     }
    // };

    // async function createMedusaOrder(orderDetails) {
    //     try {
    //         // Step 1: Create a new cart
    //         const { cart } = await medusa.carts.create();
    //         console.log("Cart ID:", cart.id);

    //         // Step 2: Add items to the cart
    //         for (const item of orderDetails.items) {
    //             const variantId = item.variants[0].id; // Extract the first variant ID
    //             const quantity = item.quantity; // Use the quantity directly

    //             console.log(`Adding item: variant_id=${variantId}, quantity=${quantity}`);
    //             await medusa.carts.lineItems.create(cart.id, {
    //                 variant_id: variantId,
    //                 quantity: quantity,
    //             });
    //         }

    //         // Step 3: Update cart with customer and address info
    //         await medusa.carts.update(cart.id, {
    //             email: orderDetails.email,
    //             shipping_address: {
    //                 first_name: orderDetails.firstName,
    //                 last_name: orderDetails.lastName,
    //                 address_1: orderDetails.streetAddress,
    //                 city: orderDetails.city,
    //                 postal_code: orderDetails.zipCode,
    //                 country_code: "pk", // Country code in ISO 3166-1 alpha-2
    //                 phone: orderDetails.phone,
    //             },
    //             billing_address: {
    //                 first_name: orderDetails.firstName,
    //                 last_name: orderDetails.lastName,
    //                 address_1: orderDetails.streetAddress,
    //                 city: orderDetails.city,
    //                 postal_code: orderDetails.zipCode,
    //                 country_code: "pk",
    //                 phone: orderDetails.phone,
    //             },
    //         });

    //         // Step 4: Set a shipping method
    //         const { shipping_options } = await medusa.shippingOptions.listCartOptions(cart.id);
    //         if (shipping_options.length > 0) {
    //             await medusa.carts.addShippingMethod(cart.id, {
    //                 option_id: shipping_options[0].id,
    //             });
    //         } else {
    //             console.error("No shipping options available");
    //             return;
    //         }

    //         // Step 5: Complete the cart (turn it into an order)
    //         const { order } = await medusa.carts.complete(cart.id);
    //         console.log("Order created successfully with ID:", order.id);
    //         alert("Order created successfully");
    //     } catch (error) {
    //         console.error("Error creating order:", error.response?.data || error.message);
    //         alert("Error creating order: " + (error.response?.data?.message || error.message));
    //     }
    // }



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
                                    {item.title}
                                </Typography>
                                <Typography sx={styles.orderTrackSummaryCardTotalItems}>
                                    {item.quantity} item{item.quantity > 1 ? 's' : ''}
                                </Typography>
                                <Typography sx={{ ...styles.boldfont2 }}>
                                    ${(item.variants[0].prices[0].amount / 100 * item.quantity).toFixed(2)}
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
                        <Button variant="contained" sx={{ ...styles.btn, width: "90%" }} onClick={handleCreateCart}>
                            create cart
                        </Button>

                        <Button variant="contained" sx={{ ...styles.btn, width: "90%" }} onClick={handleShippingSetup}>
                            Add Shipping Adress
                        </Button>


                        <Button variant="contained" sx={{ ...styles.btn, width: '90%' }} onClick={handleCompletePurchase} disabled={!isReadyToPurchase}
                        >
                            Complete Purchase
                        </Button>

                        <Typography style={styles.udtxt}>Edit cart</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default OrderTrackSummaryCard;

