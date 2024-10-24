"use client"

import { ContactFormStyles, FAQsStyles } from '@/components/Ui/Styles/Styles'
import { Typography, Grid, Box, TextField, Button, InputLabel, useMediaQuery, CircularProgress } from '@mui/material'
import { FooterMainStyles, RegistrationStyles, WhyChooseUsStyles, } from '@/components/Ui/Styles/Styles'
import { useFormik } from "formik";
import Swal from 'sweetalert2';
import * as Yup from "yup";

import React, { useState } from 'react'

function GetInTouch() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [loading, setLoading] = useState(false);


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(25).required("please Enter Your Name"),
            email: Yup.string().email("Invalid email address").required("Please Enter your Email"),
            message: Yup.string()
                .min(6, "Message must be at least 6 characters")
                .max(300, "Message must be at most 300 characters")
                .required("Please Enter Your Message"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await fetch("/api/sendemail/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": 'text/plain',
                    },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        message: values.message,
                    }),
                });

                if (response.ok) {
                    console.log("Email sent successfully");
                    // alert("Email sent successfully")
                    Swal.fire({
                        title: 'Success!',
                        text: 'Email sent successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    setLoading(false);
                    // Optionally show a success message to the user
                } else {
                    console.error("Error sending email");
                    // alert("Error sending email")
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to send email. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    setLoading(false);
                    // Optionally show an error message to the user
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while sending the email.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                // alert("Error sending email")
                setLoading(false);
            }
        },
    });
    return (
        <div>
            <Typography sx={FAQsStyles.title}>Get in Touch</Typography>
            <Grid container spacing={5} mb={5}  >
                <Grid item xs={12} sm={12} md={12} lg={6} mt={2} sx={{ ...FooterMainStyles.firstGrid, ...ContactFormStyles.formGrid }} >
                    <form onSubmit={formik.handleSubmit}  >
                        <Box sx={ContactFormStyles.fieldBox}>
                            <InputLabel sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ContactFormStyles.labelStyle }} >FULL NAME</InputLabel>
                            <TextField

                                sx={RegistrationStyles.textField}
                                id="name"
                                placeholder="Your Name"
                                name="name"
                                autoComplete="off"
                                type="name"
                                inputProps={{ maxLength: 50, style: { padding: 12 } }}
                                variant="outlined"
                                fullWidth
                                {...formik.getFieldProps("name")}

                            />
                            {formik.touched.name && formik.errors.name ? (
                                <Typography sx={RegistrationStyles.requiredStyle}>{formik.errors.name}</Typography>
                            ) : null}
                        </Box>
                        <Box sx={ContactFormStyles.fieldBox}>
                            <InputLabel sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ContactFormStyles.labelStyle }} >EMAIL ADDRESS</InputLabel>

                            <TextField
                                sx={RegistrationStyles.textField}
                                id="email"
                                placeholder="Your Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 50, style: { padding: 12 } }}

                                fullWidth
                                {...formik.getFieldProps("email")}

                            />
                            {formik.touched.email && formik.errors.email ? (
                                <Typography sx={RegistrationStyles.requiredStyle}>{formik.errors.email}</Typography>
                            ) : null}
                        </Box>

                        <Box sx={ContactFormStyles.fieldBox}>
                            <InputLabel sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...ContactFormStyles.labelStyle }} >MESSAGE</InputLabel>

                            <TextField
                                sx={{
                                    ...RegistrationStyles.textField,
                                }}
                                placeholder="Your message"
                                name="message"
                                variant="outlined"
                                type='text'
                                id="message"
                                autoComplete="off"
                                inputProps={{ maxLength: 300, rows: 6, style: { height: '6rem' }, }}
                                fullWidth
                                multiline
                                {...formik.getFieldProps("message")}

                            />
                        </Box>
                     {formik.touched.message && formik.errors.message ? (
                            <Typography sx={RegistrationStyles.requiredStyle}>{formik.errors.message}</Typography>
                        ) : null} 

                        <Box sx={ContactFormStyles.buttonBox} >
                            <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, minWidth: 250 }} disabled={loading} >
                                {loading ? <CircularProgress size={24} sx={{ color: "#FFF" }} /> : "Send Message"}
                            </Button>
                        </Box>


                    </form>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} sx={{ ...FooterMainStyles.firstGrid, ...ContactFormStyles.mapGrid }} >
                    <iframe
                        width={isMobile ? 300 : 500}
                        height={isMobile ? 200 : 400}
                        borderRadius="13px"
                        frameBorder="0"
                        style={{ border: 0, borderRadius: "10px", marginTop: "1rem" }}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33.6074086!2d73.100091!3dYOUR_ZOOM_LEVEL!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfeb96a77dbcff%3A0x936bce527a1d6838!2sOctathorn+Technologies!5e0!3m2!1sen!2sus!4vYOUR_EMBED_API_KEY"
                        allowFullScreen
                        title="Google Map"
                    ></iframe>
                </Grid>
            </Grid>
        </div >
    )
}

export default GetInTouch
