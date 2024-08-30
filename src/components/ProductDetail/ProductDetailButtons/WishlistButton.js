"use client"

import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WishListModal from '@/components/Ui/Dialogues/WishList';

const WishlistContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '200px',
  height: '40px',
  justifyContent: 'space-between',
  padding: '0 5px',
  backgroundColor: '#f9f9f9',
  marginLeft: 10
});

const WishlistText = styled(Typography)({
  fontSize: '14px',
  marginLeft: '8px',
  flexGrow: 1,
});

const HeartButton = styled(IconButton)({
  padding: '5px',
});

const WishListButton = () => {
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  const handleToggleWishlist = () => {
    <WishListModal />
    setAddedToWishlist(!addedToWishlist);
  };

  return (
    <WishlistContainer onClick={handleToggleWishlist} style={{ cursor: 'pointer', justifyContent: "center", alignItems: "center", display: "flex" }}>
      <HeartButton>
        {addedToWishlist ? (
          <FavoriteIcon style={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </HeartButton>
      <WishlistText>Add to Wishlist</WishlistText>
    </WishlistContainer>
  );
};

export default WishListButton;
