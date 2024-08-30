"use client"

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RegistrationStyles } from "../../Ui/Styles/Styles";
import medusa from '@/medusaClient';

function ResetPassword() {

    // const medusa = useSelector((state) => state.medusaConfig.medusa);
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (router.isReady) {
            const { token } = router.query;
            setToken(token);
        }
    }, [router.isReady, router.query]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async () => {
        if (!token) {
            setError('Token is required to reset password');
            return;
        }
        try {
            await medusa.customers.resetPassword({
                email,
                password,
                token,
            });

            setMessage('Password has been reset successfully');
            setError('');
        } catch (error) {
            setError('Failed to reset password. Please try again.');
            setMessage('');
        }
    };

    return (
        <>
            <Box sx={{ ...RegistrationStyles.outerBox, paddingTop: "3rem" }}>
                <Box sx={RegistrationStyles.formBox}>
                    <Typography sx={RegistrationStyles.title}>
                        Reset Password
                    </Typography>
                    <Typography sx={RegistrationStyles.subTitle}>
                        Please enter your new password
                    </Typography>
                    <form style={{ marginTop: "1rem" }} onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
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
                        <Box sx={RegistrationStyles.fieldBox}>
                            <TextField
                                sx={RegistrationStyles.textField}
                                id="password"
                                placeholder="Enter Your New Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                        {message && <Typography color="success.main">{message}</Typography>}
                        {error && <Typography color="error.main">{error}</Typography>}
                        <Box sx={RegistrationStyles.linkBox}>
                            <Button sx={{ ...RegistrationStyles.buttonStyle, width: "50%" }} type="submit">
                                Reset
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
}

export default ResetPassword;
