"use client"

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, TextField, Button, NativeSelect } from '@mui/material'
import { ContactFormStyles, FooterMainStyles, WhyChooseUsStyles, ProductCardStyles, DisplayProductsStyles, CategoriesCardStyles, BreadCrumbStyles, ProductDetailStyles } from '@/components/Ui/Styles/Styles'
import axios from 'axios'
import Swal from 'sweetalert2';


function ProductReviewForm() {

    const product = useSelector((state) => state.product.selectedProduct);
    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        // Check if the email matches the regex pattern
        setIsEmailValid(emailRegex.test(inputEmail));
    };

    const handleChange = (event) => {
        setRating(parseInt(event.target.value, 10)); // Ensure rating is an integer
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!isEmailValid || email === "") {
            Swal.fire({
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            setIsSubmitting(false); // Stop submitting process
            return;
        }
        if (!email || !name || !comment) {
            Swal.fire({
                title: "Error",
                text: "Please fill in all the required fields.",
                icon: "warning",
                button: "OK",
            });
            setIsSubmitting(false); // Stop submitting process
            return;
        }
        try {
            const response = await fetch('/api/review/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain', // Change the Content-Type to text/plain
                },
                body: JSON.stringify({
                    rating,
                    email,
                    name,
                    comment,
                    product_id: product.id // Ensure product is defined and has an id
                }),
            });

            if (!response.ok) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to create review',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                console.log(response, response.body, "the response coming from API");
                throw new Error('Failed to create review');
            } else {
                const result = await response.json();
                Swal.fire({
                    title: 'Success!',
                    text: 'Your Review Submitted Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                setComment("");
                setEmail("");
                setName("");
                console.log('Review created:', result);
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create review Connectivity Error',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            console.error('Error creating review:', error);
        }
        finally {
            setIsSubmitting(false);  // Re-enable the submit button
        }
    };

    return (

        <form   >
            <Box sx={ProductDetailStyles.productReviewFormContainerBox}>
                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ProductCardStyles.descriptionTypo, ...DisplayProductsStyles.headingStyle }}>
                    Your Review
                </Typography>
                <Typography sx={{ ...CategoriesCardStyles.listItemText, ...BreadCrumbStyles.activeTypo, ...ProductDetailStyles.productReviewsFormSubtitleTypo }}>
                    Tell us what you think about !!!
                </Typography>

                <TextField
                    id="standard-password-input"
                    placeholder="Your Name"
                    sx={ProductDetailStyles.productReviewsFormFieldsMargin}
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="current-password"
                    variant="standard"
                    fullWidth

                />
                <TextField
                    id="standard-password-input"
                    sx={ProductDetailStyles.productReviewsFormFieldsMargin}
                    placeholder="Your E-mail"
                    type="email"
                    autoComplete="current-password"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={handleEmailChange}
                    variant="standard"
                    fullWidth
                />
                <NativeSelect
                    value={rating}
                    onChange={handleChange}
                    defaultValue={3}
                    sx={{ ...ProductDetailStyles.productReviewsFormFieldsMargin, fontWeight: 600, }}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                    fullWidth
                >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                </NativeSelect>
                <TextField
                    id="standard-multiline-static"
                    placeholder="This product is..."
                    sx={ProductDetailStyles.productReviewsFormFieldsMargin}
                    type="text"
                    autoComplete="none"
                    variant="standard"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    multiline
                    rows={4} // Adjust the number of rows as needed
                />
                <Button variant="contained"
                    disabled={isSubmitting}  // Disable the button when submitting
                    onClick={(e) => handleSubmit(e)} sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, width: "100%" }}  >   {isSubmitting ? 'Submitting...' : 'Submit'}</Button>
            </Box>
        </form>

    )
}

export default ProductReviewForm

