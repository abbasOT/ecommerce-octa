"use client"

import React from 'react'
import ModalMain from './ModalMain'

function WishListModal({ open, handleWishListModalClose, handleWishList, productTitle, handleRemoveFromWishList }) {
    return (
        <div>
            <ModalMain open={open} handleModalClose={handleWishListModalClose} handleConfirmAction={handleWishList} handleRemoveFromWishList={handleRemoveFromWishList} dialogueHeading={"Added to Wishlist"} dialogueDescription={`${productTitle} is on your Wishlist! Keep browsing or go check it out.`} />
        </div>
    )
}

export default WishListModal
