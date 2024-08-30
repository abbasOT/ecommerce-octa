"use client"

import React from 'react'
import ModalMain from './ModalMain'

function AddCartModal({ open, handleAddCartModalClose, handleAddCart, productTitle, handleRemoveFromCart }) {
    return (
        <div>
            <ModalMain open={open}
                handleModalClose={handleAddCartModalClose}
                handleConfirmAction={handleAddCart} dialogueHeading={"Added to Cart"} handleRemoveFromCart={handleRemoveFromCart} dialogueDescription={`${productTitle} is in your Cart! Keep browsing or go check it out.`} />
        </div>
    )
}

export default AddCartModal
