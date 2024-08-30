"use client"
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CategoriesCardStyles, DialogueStyles } from '../Styles/Styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalMain({ open, handleModalClose, handleConfirmAction, dialogueHeading, dialogueDescription, handleRemoveFromCart, handleRemoveFromWishList }) {

    const colorToUse = dialogueHeading === 'Added to Cart' ? 'var(--primary-color)' : "#4C4848"

    return (
        <Dialog
            open={open}
            onClose={handleModalClose}
            PaperProps={{
                sx: { ...DialogueStyles.paperPropsStyle, borderLeft: `5px solid ${colorToUse}`, },
            }}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <Box sx={DialogueStyles.iconBox}>
                <InfoOutlinedIcon style={{ width: "40px", color: colorToUse }} />
            </Box>
            <DialogTitle sx={{ ...DialogueStyles.textStyle, ...dialogueSpacings }}>
                {dialogueHeading}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleModalClose}
                sx={{ position: 'absolute', right: 8, top: 8, }} >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={dialogueSpacings}>
                <DialogContentText sx={{ ...DialogueStyles.subtitleText }}>
                    {dialogueDescription}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={DialogueStyles.dialogActionsStyle}>
                <Button variant='text' sx={CategoriesCardStyles.listItemText} onClick={dialogueHeading === "Added to Cart" ? handleRemoveFromCart : handleRemoveFromWishList}>
                    Undo
                </Button>
                <Button sx={{ ...DialogueStyles.actionButtonStyle, background: colorToUse }} onClick={handleConfirmAction}>
                    See
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const dialogueSpacings = { margin: "0rem 0rem 0rem 2rem", padding: "0.5rem 1rem" }

export default ModalMain;
