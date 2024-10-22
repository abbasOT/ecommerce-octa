"use client"
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, IconButton, Box, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CategoriesCardStyles, DialogueStyles, RegistrationStyles } from '../Styles/Styles';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function OtpModal({ handleOtpModalClose, handleOtpSubmit}) {

    const [otp, setOtp] = useState('');

    const handleSubmit = () => {
        handleOtpSubmit(otp);
    };

    return (
        <Dialog
            open={open}
            onClose={handleOtpModalClose}
            PaperProps={{
                sx: { ...DialogueStyles.paperPropsStyle, borderLeft: `5px solid var(--primary-color)`, },
            }}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <Box sx={DialogueStyles.iconBox}>
                <InfoOutlinedIcon style={{ width: "40px", color: 'var(--primary-color)' }} />
            </Box>
            <DialogTitle sx={{ ...DialogueStyles.textStyle, ...dialogueSpacings }}>
                Email verification OTP Code
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleOtpModalClose}
                sx={{ position: 'absolute', right: 8, top: 8, }} >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={dialogueSpacings}>
                <DialogContentText sx={{ ...DialogueStyles.subtitleText }}>
                Please enter the OTP code we sent to your email
                </DialogContentText>
                <Box sx={RegistrationStyles.fieldBox}>
                    <TextField
                        sx={RegistrationStyles.textField}
                        id="otp"
                        placeholder="Enter Your Code"
                        name="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={DialogueStyles.dialogActionsStyle}>
                <Button sx={{ ...DialogueStyles.actionButtonStyle, background: "black" }} onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const dialogueSpacings = { margin: "0rem 0rem 0rem 2rem", padding: "0.5rem 1rem" }

export default OtpModal;
