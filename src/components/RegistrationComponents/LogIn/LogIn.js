"use client"

import React, { useState } from 'react'
import { Box, Typography, TextField, InputLabel, Button, useMediaQuery, Checkbox } from '@mui/material'
import { RegistrationStyles } from '../../Ui/Styles/Styles';
import Google from "../../Ui/Assets/Registration/google.svg"
import Logo from "../../Ui/Assets/Registration/NodeLogo.svg"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { customer_id } from '@/redux/slices/medusaConfig';
import { updateOrderValue } from '@/redux/slices/orderSlice';

import Image from 'next/image';
import Link from 'next/link'
import medusa from '@/medusaClient';
function LogIn() {

    const dispatch = useDispatch();
    const isXS = useMediaQuery("(max-width: 600px)");
    const router = useRouter();

    // const medusa = useSelector((state) => state.medusaConfig.medusa);

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]+$/;

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Please Enter your Email"),
            password: Yup.string().matches(passwordRegex, "Password must contains one number & letter")
                .min(6, "Password must be at least 6 characters")
                .max(20, "Password must be at most 20 characters")
                .required("Please Enter password"),
        }),
        onSubmit: async (values) => {
            try {
                await authenticateUser(values);

                medusa.customers.retrieve()
                    .then(({ customer }) => {
                        dispatch(customer_id(customer.id))
                        dispatch(updateOrderValue({ name: 'customerId', value: customer.id }))
                        if (typeof window !== 'undefined') {
                            // Access localStorage only in the browser environment
                            localStorage.setItem('customerId', customer.id);
                        }
                    })
                alert("User Logged In successfully!");
                router.push('/');
                console.log("User Logged In successfully:", values.email, values.password);

            }
            catch (error) {
                alert("Password or Email is Incorrect!");
                setError(error.message);
            }


        },
    });

    const authenticateUser = async (userData) => {
        await medusa.auth.authenticate({
            email: userData.email,
            password: userData.password
        });
    };

    return (
        <>

            <Box sx={RegistrationStyles.outerBox}>
                <Box sx={{ ...RegistrationStyles.LogoBox, }}>
                    <Image src={Logo} width={isXS ? "280px" : "400px"} alt="Node" />
                </Box>
                <Typography sx={RegistrationStyles.title}>
                    Log in to your Account
                </Typography>
                <Typography sx={RegistrationStyles.subTitle}>
                    Clarity gives you the blocks and components you need to create a <br></br> truly  professional website.
                </Typography>
                <Box sx={RegistrationStyles.formBox}>
                    <form
                        onSubmit={formik.handleSubmit}
                        style={{ marginTop: "2rem" }}>
                        <Box sx={RegistrationStyles.fieldBox}>
                            <TextField
                                sx={RegistrationStyles.textField}
                                id="email"
                                placeholder="Email Address"
                                name="email"
                                type="email"
                                variant="outlined"
                                autoComplete="off"
                                inputProps={{ maxLength: 50 }}

                                fullWidth
                                {...formik.getFieldProps("email")}

                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={RegistrationStyles.requiredStyle}>{formik.errors.email}</div>
                            ) : null}
                        </Box>

                        <Box sx={{ ...RegistrationStyles.textField }}>
                            <TextField
                                sx={RegistrationStyles.textField}
                                placeholder="Enter Password"
                                name="password"
                                variant="outlined"
                                type='password'
                                id="password"
                                autoComplete="off"
                                inputProps={{ maxLength: 50 }}
                                fullWidth
                                {...formik.getFieldProps("password")}

                            />
                        </Box>
                        {formik.touched.password && formik.errors.password ? (
                            <div style={RegistrationStyles.requiredStyle}>{formik.errors.password}</div>
                        ) : null}

                        <Box sx={RegistrationStyles.linksContainerBox}>
                            <Box sx={{ display: "flex" }}>
                                <Checkbox
                                    id="agreeTerms"
                                    sx={RegistrationStyles.checkBoxStyle}
                                />
                                <Typography sx={{ ...RegistrationStyles.subTitle, ...RegistrationStyles.checkBoxTypo }} >
                                    Remember Me
                                </Typography>

                            </Box>

                            <Link href={'/forget-password'} style={{ ...RegistrationStyles.linkStyle, ...RegistrationStyles.ForgetPasswordLinkTypo }}>Forgot password?</Link>
                        </Box>

                        <Box sx={RegistrationStyles.buttonBox}>
                            <Button sx={RegistrationStyles.buttonStyle} type='submit' >
                                Log in
                            </Button>
                            <Button sx={{ ...RegistrationStyles.buttonStyle, ...RegistrationStyles.googleButton }} type='submit' >
                                <Image src={Google} />
                                Log in with Google
                            </Button>
                        </Box>
                        <Box sx={RegistrationStyles.linkBox}>
                            <Typography sx={RegistrationStyles.subTitle}>
                                Already Have An Account?{'\u00a0'} <Link href={'/signup'} style={RegistrationStyles.linkStyle}>Sign up</Link>
                            </Typography>
                        </Box>

                    </form>
                </Box>
            </Box>
        </>
    )
}

export default LogIn
