"use client"

import React, { useState } from 'react'
import { Box, Typography, TextField, InputLabel, Button, useMediaQuery, Checkbox } from '@mui/material'
import { RegistrationStyles } from '../../Ui/Styles/Styles';
import Google from "../../Ui/Assets/Registration/google.svg"
import Logo from "@/components/Ui/Assets/Registration/circuitHubLogoBlue.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { customer_id, setCustomerOrders } from '@/redux/slices/medusaConfig';
import { updateOrderValue } from '@/redux/slices/orderSlice';
import { persistor } from '../../../redux/store'; // Import the persistor
import Swal from 'sweetalert2';


import Image from 'next/image';
import Link from 'next/link'
import medusa from '@/medusaClient';
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar';
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain';
function LogIn() {

    const dispatch = useDispatch();
    const isXS = useMediaQuery("(max-width: 600px)");
    const router = useRouter();
    const [rememberMe, setRememberMe] = useState(false);

    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked);
    };

    // const medusa = useSelector((state) => state.medusaConfig.medusa);

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]+$/;

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Please Enter your Email"),
            password: Yup.string().min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters").required("Please Enter password"),
        }),
        onSubmit: async (values) => {
            try {
                await authenticateUser(values);

                medusa.customers.retrieve()
                    .then(({ customer }) => {
                        // persistor.purge();
                        dispatch({ type: 'USER_LOGOUT' });
                        dispatch(customer_id(customer.id))
                        dispatch(updateOrderValue({ name: 'customerId', value: customer.id }))
                        dispatch(setCustomerOrders(customer.orders))

                        if (typeof window !== 'undefined') {
                            if (rememberMe) {
                                // Save customerId in localStorage if "Remember Me" is checked
                                localStorage.setItem('customerId', customer.id);
                            } else {
                                // Save customerId in sessionStorage if "Remember Me" is not checked
                                sessionStorage.setItem('customerId', customer.id);
                            }
                        }
                        console.log(customer, "the data of customer")
                    })
                // alert("User Logged In successfully!");
                // SweetAlert2 success message
                Swal.fire({
                    title: 'Success!',
                    text: 'User Logged In successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    router.push('/');
                });
                console.log("User Logged In successfully:", values.email, values.password);


            }
            catch (error) {
                // alert("Password or Email is Incorrect!");
                Swal.fire({
                    title: 'Error!',
                    text: 'Password or Email is Incorrect!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
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
    const handleNavigationSignup = () => {
        router.push('/signup');
    }

    const handleLogo = () => {
        router.push('/');
    }


    const handleGoogleLogin = async () => {
        try {
            await persistor.purge();
            dispatch({ type: 'USER_LOGOUT' });
            if (rememberMe) {
                // Save customerId in localStorage if "Remember Me" is checked
                localStorage.setItem('rememberMe', true);
            }
            window.location.href = 'https://admin.circuithub.pk/store/auth/google';
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    return (
        <>
            <HeaderBar />
            <Box sx={RegistrationStyles.outerBox}>
                <Box sx={{ ...RegistrationStyles.LogoBox, }}>
                    <Image src={Logo} width={isXS ? "280px" : "400px"} alt="Node" onClick={handleLogo} />
                </Box>
                <Typography sx={RegistrationStyles.title}>
                    Log in to your Account
                </Typography>
                <Typography sx={RegistrationStyles.subTitle}>
                    Log in to access your personalized shopping experience and <br></br> exclusive offers.
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
                                    checked={rememberMe}
                                    onChange={handleCheckboxChange}
                                />
                                <Typography sx={{ ...RegistrationStyles.subTitle, ...RegistrationStyles.checkBoxTypo }} >
                                    Remember Me
                                </Typography>

                            </Box>

                            <Typography onClick={() => router.push('/forget-password')} sx={{ ...RegistrationStyles.linkStyle, ...RegistrationStyles.ForgetPasswordLinkTypo }}>Forgot password?</Typography>
                        </Box>

                        <Box sx={RegistrationStyles.buttonBox}>
                            <Button sx={RegistrationStyles.buttonStyle} type='submit' >
                                Log in
                            </Button>
                            <Button sx={{ ...RegistrationStyles.buttonStyle, ...RegistrationStyles.googleButton }} onClick={handleGoogleLogin} >
                                <Image src={Google} />
                                Log in with Google
                            </Button>
                        </Box>
                        <Box sx={RegistrationStyles.linkBox}>
                            <Typography sx={RegistrationStyles.subTitle}>
                                Don&apos;t Have An Account?
                            </Typography>
                            <Typography style={RegistrationStyles.linkStyle} onClick={handleNavigationSignup}>Sign up</Typography>
                        </Box>

                    </form>
                </Box>
            </Box>
            <FooterMain />
        </>
    )
}

export default LogIn
