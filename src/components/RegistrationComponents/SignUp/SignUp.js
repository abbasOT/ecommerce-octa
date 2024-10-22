"use client"

import React, { useState } from 'react'
import { Box, Typography, TextField, InputLabel, Button, useMediaQuery, Checkbox } from '@mui/material'
import { RegistrationStyles } from '../../Ui/Styles/Styles';
import Google from "../../Ui/Assets/Registration/google.svg";
import Logo from "@/components/Ui/Assets/Registration/circuitHubLogoBlue.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Swal from 'sweetalert2';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import medusa from '@/medusaClient';
import OtpModal from '@/components/Ui/Dialogues/OtpModal';
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar';
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain';
import { persistor } from '@/redux/store';
import { customer_id } from '@/redux/slices/medusaConfig';
function SignUp() {

    const isXS = useMediaQuery("(max-width: 600px)");
    const router = useRouter();
    // const medusa = useSelector((state) => state.medusaConfig.medusa);

    const dispatch = useDispatch()

    const [error, setError] = useState(null);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [verified, setVerified] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [storedOtp, setStoredOtp] = useState("")



    const handleCheckboxChange = (e) => {
        setIsTermsChecked(e.target.checked);
    };


    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]+$/;

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(25).required("Please Enter Your Name"),
            email: Yup.string().email("Invalid email address").required("Please Enter your Email"),
            password: Yup.string().matches(passwordRegex, "Password must contain one number & letter")
                .min(6, "Password must be at least 6 characters")
                .max(20, "Password must be at most 20 characters")
                .required("Please Enter password"),
        }),
        onSubmit: async (values) => {
            try {
                // Check if email exists
                const registeredEmail = await medusa.auth.exists(values.email);

                // If email exists, show alert
                if (registeredEmail.exists) {
                    // alert("Sorry: email is already registered!");
                    Swal.fire({
                        title: 'Error!',
                        text: 'Sorry: email is already registered!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    // Create user
                    localStorage.setItem('pendingUser', JSON.stringify(values));
                    await handleEmailVerification(values.email)
                    // await createUser(values);
                    // alert("User signed up successfully!");
                    // Swal.fire({
                    //     title: 'Success!',
                    //     text: 'User signed up successfully!',
                    //     icon: 'success',
                    //     confirmButtonText: 'OK'
                    // }).then(() => {
                    //     router.push('/login');
                    // });
                    // console.log("User signed up successfully:", values.name, values.email, values.password);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setError(error.message);

            }
        },
    });

    const createUser = async (userData) => {
        await medusa.customers.create({
            first_name: userData.name,
            last_name: "",
            email: userData.email,
            password: userData.password
        });
    };

    const authenticateUser = async (userData) => {
        await medusa.auth.authenticate({
            email: userData.email,
            password: userData.password
        });
    };

    const handleEmailVerification = async (email) => {

        // const otp = generateOTP(); 

        const expirationTime = Date.now() + 60 * 1000;
        const response = await fetch('/api/email_verification/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({ email }), // Send email and OTP
        });

        const data = await response.json();
        if (response.ok) {
            console.log('OTP sent successfully:', data.message);
            // setStoredOtp(data.Otp)
            // localStorage.setItem('otp', data.Otp);
            localStorage.setItem('otpExpiration', expirationTime);
            setShowOtpModal(true);
        }
        else if (response.status === 404) {
            console.log('Email Already Exists. Please check the email address and try again.');
        } else {
            console.error('Error sending OTP:', data.message);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to send verification link. Please try again!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    const handleNavigationLogin = () => {
        router.push('/login');
    }

    const handleLogo = () => {
        router.push('/');
    }


    const handleGoogleLogin = async () => {
        try {
            // await persistor.purge();
            dispatch({ type: 'USER_LOGOUT' });
            window.location.href = 'https://admin.circuithub.pk/store/auth/google';
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    const handleOtpModalClose = () => {
        setShowOtpModal(false);
    };

    // Function to delete OTP
    const deleteOtp = async (email) => {
        try {
            await fetch('/api/email_verification/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({ email }), // Send the email for deletion
            });
        } catch (error) {
            console.error('Error deleting OTP:', error);
        }
    };

    const handleOtpSubmit = async (otp) => {
        // const storedOtp = localStorage.getItem('otp');
        // const storedOtp = otp;
        const pendingUser = JSON.parse(localStorage.getItem('pendingUser'));
        const email = pendingUser.email

        const response = await fetch('/api/email_verification/read', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({ email, otp }), // Send email and OTP
        });

        // Check the response status and handle accordingly
        if (!response.ok) {
            const data = await response.json();
            switch (response.status) {
                case 400: // Bad Request
                    Swal.fire({
                        title: 'Error!',
                        text: 'Email and OTP are required.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    break;
                case 404: // Not Found
                    Swal.fire({
                        title: 'Error!',
                        text: 'No OTP found for this email.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    break;
                case 403: // Forbidden
                    Swal.fire({
                        title: 'Error!',
                        text: 'Invalid OTP provided.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    break;
                case 410: // Gone (Expired)
                    Swal.fire({
                        title: 'Error!',
                        text: 'OTP has expired. Please try again!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    break;
                case 500: // Internal Server Error
                default:
                    Swal.fire({
                        title: 'Error!',
                        text: 'An unexpected error occurred. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    break;
            }
            handleOtpModalClose();
            await deleteOtp(email);
            return;
        }
        // If everything went well
        const successData = await response.json();
        if (successData.message === 'OTP verified successfully') {
            const pendingUser = JSON.parse(localStorage.getItem('pendingUser'));
            if (pendingUser) {
                try {
                    // Create user in your system (e.g., Medusa or your backend)
                    await createUser(pendingUser);
                    Swal.fire({
                        title: 'Success!',
                        text: 'OTP verified and account created successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    handleOtpModalClose(); // Close dialog after success
                    localStorage.removeItem('pendingUser'); // Clean up
                    // localStorage.removeItem('otp');
                    await authenticateUser(pendingUser);
                    medusa.customers.retrieve()
                        .then(({ customer }) => {
                            // persistor.purge();
                            dispatch({ type: 'USER_LOGOUT' });
                            dispatch(customer_id(customer.id))
                            if (typeof window !== 'undefined') {
                                sessionStorage.setItem('customerId', customer.id);
                            }
                            console.log(customer, "the data of customer")
                        })
                    router.push('/');
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error creating account. Please try again!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'No user data found. Please restart the signup process.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid OTP. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            // localStorage.removeItem('otp');
            localStorage.removeItem('pendingUser');
            handleOtpModalClose();
        }
        await deleteOtp(email);
    }
    return (
        <>

            <HeaderBar />
            <Box sx={RegistrationStyles.outerBox}>
                <Box sx={{ ...RegistrationStyles.LogoBox, }}>
                    <Image src={Logo} width={isXS ? "280px" : "400px"} alt="Node" onClick={handleLogo} />
                </Box>
                <Typography sx={RegistrationStyles.title}>
                    Create Free Account
                </Typography>
                <Typography sx={RegistrationStyles.subTitle}>
                    Create a new account today and enjoy a personalized shopping experience with <br></br> exclusive deals and offers
                </Typography>
                <Box sx={RegistrationStyles.formBox}>
                    <form
                        onSubmit={formik.handleSubmit}
                        style={{ marginTop: "1rem" }}>
                        <Box sx={RegistrationStyles.fieldBox}>
                            <TextField
                                sx={RegistrationStyles.textField}
                                id="name"
                                placeholder="Your Name"
                                name="name"
                                autoComplete="off"
                                type="name"
                                inputProps={{ maxLength: 50 }}
                                variant="outlined"
                                fullWidth
                                {...formik.getFieldProps("name")}

                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div style={RegistrationStyles.requiredStyle}>{formik.errors.name}</div>
                            ) : null}
                        </Box>
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
                                placeholder="Create Password"
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

                        <Box display={"flex"}>
                            <Checkbox
                                id="agreeTerms"
                                sx={RegistrationStyles.checkBoxStyle}
                                checked={isTermsChecked}
                                onChange={handleCheckboxChange} // Track the checkbox change
                            />
                            <Typography sx={{ ...RegistrationStyles.subTitle, ...RegistrationStyles.checkBoxTypo }} >
                                I agree with the <Link href={'/our/terms-conditions'} style={{ ...RegistrationStyles.linkStyle, fontWeight: 400 }}>Terms & Conditions</Link> of Clarity
                            </Typography>
                        </Box>


                        <Box sx={RegistrationStyles.buttonBox}>
                            <Button sx={RegistrationStyles.buttonStyle} type='submit' disabled={!isTermsChecked}>
                                Sign Up
                            </Button>
                            <Button sx={{ ...RegistrationStyles.buttonStyle, ...RegistrationStyles.googleButton }} onClick={handleGoogleLogin} disabled={!isTermsChecked}>
                                <Image src={Google} />
                                Sign up with Google
                            </Button>
                        </Box>
                        <Box sx={RegistrationStyles.linkBox}>
                            <Typography sx={RegistrationStyles.subTitle}  >
                                Already Have An Account?
                            </Typography>
                            <Typography style={RegistrationStyles.linkStyle} onClick={handleNavigationLogin}>Log in</Typography>
                        </Box>

                    </form>
                </Box>
            </Box>
            <FooterMain />
            {showOtpModal && (
                <OtpModal handleOtpModalClose={handleOtpModalClose} handleOtpSubmit={handleOtpSubmit} />
            )}

        </>
    )
}

export default SignUp
