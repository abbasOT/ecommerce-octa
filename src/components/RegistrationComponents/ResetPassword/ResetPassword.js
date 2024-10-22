"use client"

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';

import { useSelector } from 'react-redux';
import { RegistrationStyles } from "../../Ui/Styles/Styles";
import Swal from 'sweetalert2';
import medusa from '@/medusaClient';
import { setCustomerOrders } from '@/redux/slices/medusaConfig';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function ResetPassword() {

    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState(false);
    // const email = localStorage.getItem('customerEmail');
    const { token } = useParams();
    const searchParams = useSearchParams();
    const email = searchParams.get('email'); // Query param email

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]+$/;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };



    const handleResetPassword = async () => {

        if (!passwordRegex.test(password)) {
            setError("Password must contain at least one number and one letter");
            return;
        }

        if (password.length < 6 || password.length > 20) {
            setError("Password must be between 6 to 20 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(false);
        try {
            // Call Medusa's reset password function
            const { customer } = await medusa.customers.resetPassword({
                email: email,
                password: password,
                token: token
            });

            // Success message and redirect after successful reset
            console.log('Password changed successfully for customer:', customer.id);
            Swal.fire({
                title: 'Success!',
                text: 'Password changed successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                router.push('/login');
            });

        } catch (error) {
            // Log the error
            console.error('Failed to update your password:', error);

            // Error message and redirect in case of failure
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update your password. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                router.push('/forget-password');
            });
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
                        <Box sx={{ ...RegistrationStyles.fieldBox, position: "relative" }}>
                            <TextField
                                sx={RegistrationStyles.textField}
                                id="password"
                                placeholder="Enter Your New Password"
                                name="password"
                                type={passwordVisible ? 'text' : 'password'}
                                inputProps={{ maxLength: 19 }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                            <Box
                                sx={RegistrationStyles.passwordEyeBox}
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <VisibilityOff /> : <Visibility />}
                            </Box>
                        </Box>
                        <Box sx={{ ...RegistrationStyles.fieldBox, position: "relative" }}>
                            <TextField
                                sx={RegistrationStyles.textField}
                                id="password"
                                placeholder="Confirm Your password"
                                name="Confirmpassword"
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                inputProps={{ maxLength: 19 }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                            <Box
                                sx={RegistrationStyles.passwordEyeBox}
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                            </Box>
                        </Box>

                        {error && <Typography color={"red"}>{error}</Typography>}
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
