"use client"

import React, { useState } from 'react'
import { Box, Typography, TextField, InputLabel, Button, useMediaQuery, Checkbox } from '@mui/material'
import { RegistrationStyles } from '../../Ui/Styles/Styles';
import Google from "../../Ui/Assets/Registration/google.svg";
import Logo from "@/components/Ui/Assets/Registration/circuitHubLogoBlue.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import medusa from '@/medusaClient';
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar';
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain';
function SignUp() {

    const isXS = useMediaQuery("(max-width: 600px)");
    const router = useRouter();
    // const medusa = useSelector((state) => state.medusaConfig.medusa);

    const [error, setError] = useState(null);

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
                    alert("Sorry: email is already registered!");
                } else {
                    // Create user
                    await createUser(values);
                    alert("User signed up successfully!");
                    router.push('/login');
                    console.log("User signed up successfully:", values.name, values.email, values.password);
                }
            } catch (error) {
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


    const handleNavigationLogin = () => {
        router.push('/login');
    }
    return (
        <>

<HeaderBar />
            <Box sx={RegistrationStyles.outerBox}>
                <Box sx={{ ...RegistrationStyles.LogoBox, }}>
                    <Image src={Logo} width={isXS ? "280px" : "400px"} alt="Node" />
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
                                placeholder="First & Last Name"
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
                            />
                            <Typography sx={{ ...RegistrationStyles.subTitle, ...RegistrationStyles.checkBoxTypo }} >
                                I agree with the <Link href={'/policy'} style={{ ...RegistrationStyles.linkStyle, fontWeight: 400 }}>Terms & Conditions</Link> of Clarity
                            </Typography>
                        </Box>


                        <Box sx={RegistrationStyles.buttonBox}>
                            <Button sx={RegistrationStyles.buttonStyle} type='submit' >
                                Sign Up
                            </Button>
                            <Button sx={{ ...RegistrationStyles.buttonStyle, ...RegistrationStyles.googleButton }} type='submit' >
                                <Image src={Google} />
                                Sign up with Google
                            </Button>
                        </Box>
                        <Box sx={RegistrationStyles.linkBox}>
                            <Typography sx={RegistrationStyles.subTitle} >
                                Already Have An Account?
                            </Typography>
                            <Typography style={RegistrationStyles.linkStyle} onClick={handleNavigationLogin}>Log in</Typography>
                        </Box>

                    </form>
                </Box>
            </Box>
            <FooterMain />
        </>
    )
}

export default SignUp
