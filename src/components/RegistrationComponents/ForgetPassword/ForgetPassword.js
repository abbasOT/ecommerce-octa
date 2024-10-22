"use client"
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RegistrationStyles } from "../../Ui/Styles/Styles";

import medusa from '@/medusaClient';
function ForgetPassword() {

    // const medusa = useSelector((state) => state.medusaConfig.medusa);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');



    const handleForgetPassword = async () => {
        setMessage('');
        setError('');

        medusa.customers.generatePasswordToken({
            email: email
        })
            .then(() => {
                setMessage('Password reset link has been sent to your email.');
                // localStorage.setItem('customerEmail', email)
            })
            .catch(() => {
                setError('Email not found. Please check the email address and try again.');
            })
    };



    return (
        <>
            <Box sx={{ ...RegistrationStyles.outerBox, paddingTop: "3rem" }}>
                <Box sx={RegistrationStyles.formBox}>
                    <Typography sx={RegistrationStyles.title}>
                        Password Reset
                    </Typography>
                    <Typography sx={RegistrationStyles.subTitle}>
                        Kindly fill in your Email for the Password Reset Link
                    </Typography>
                    <form style={{ marginTop: "1rem" }} onSubmit={(e) => { e.preventDefault(); handleForgetPassword(); }}>
                        <Box sx={RegistrationStyles.fieldBox}>
                            <TextField
                                sx={RegistrationStyles.textField}
                                id="email"
                                placeholder="Enter Your Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        {message && <Typography color="success.main">{message}</Typography>}
                        {error && <Typography color="error.main">{error}</Typography>}
                        <Box sx={RegistrationStyles.linkBox}>
                            <Button sx={{ ...RegistrationStyles.buttonStyle, width: "50%" }} type="submit">
                                Send
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>

        </>
    );
}

export default ForgetPassword;
