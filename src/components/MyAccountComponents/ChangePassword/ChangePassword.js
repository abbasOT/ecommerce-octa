"use client"

import { ContactFormStyles, FAQsStyles, RegistrationStyles, CategoriesCardStyles, FooterMainStyles, MyAccountStyles } from '@/components/Ui/Styles/Styles'
import { Typography, Box, InputLabel, TextField, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import React from 'react'

function ChangePassword() {

    const customerId = useSelector((state => state.medusaConfig.customer_id))

    return customerId !== "" ? (
        <>
            <Box sx={MyAccountStyles.containerBox}>
                <Typography sx={{ ...FAQsStyles.title, ...MyAccountStyles.headingTypo }}>
                    Change Password
                </Typography>
                <Box sx={{ ...FooterMainStyles.firstGrid, ...MyAccountStyles.changePasswordFormBox }}>
                    <Box sx={ContactFormStyles.fieldBox}>
                        <InputLabel sx={CategoriesCardStyles.listItemText}>New Password</InputLabel>
                        <TextField
                            sx={RegistrationStyles.textField}
                            id="newPassword"
                            name="newPassword"
                            autoComplete="off"
                            type="password"
                            inputProps={{ maxLength: 50, style: { padding: 12 } }}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                    <Box sx={ContactFormStyles.fieldBox}>
                        <InputLabel sx={CategoriesCardStyles.listItemText}>Confirm Password</InputLabel>
                        <TextField
                            sx={RegistrationStyles.textField}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            variant="outlined"
                            autoComplete="off"
                            inputProps={{ maxLength: 50, style: { padding: 12 } }}
                            fullWidth
                        />
                    </Box>
                </Box>
                <Box sx={{ ...ContactFormStyles.buttonBox, ...MyAccountStyles.buttonBox }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton }}
                    >
                        Change password
                    </Button>
                </Box>
            </Box>
        </>
    ) : (
        <Box sx={MyAccountStyles.emptyHistoryContainerBox}>
            <Typography sx={{ ...FAQsStyles.title, ...MyAccountStyles.headingTypo }}>
                Please Login first to change your password.
            </Typography>
        </Box>
    )

}

export default ChangePassword
