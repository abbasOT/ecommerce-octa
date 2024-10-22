"use client"

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { addProductToCart, removeProductFromCart, updateProductQuantity } from '@/redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';


const CounterContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100px',
  height: '50px',
  justifyContent: 'space-between',
  padding: '0 5px',
  backgroundColor: '#f9f9f9',
});

const CounterButton = styled(Button)({
  minWidth: '20px',
  padding: '5px',
  fontSize: '14px',
});

const CounterValue = styled(Typography)({
  fontSize: '16px',
});

const CountButton = ({ product, initialQuantity = 1, onQuantityChange }) => {

  const [productQuantity, setProductQuantity] = useState(initialQuantity); // Start with the initial quantity

  // Function to update the quantity
  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1; // Ensure quantity never goes below 1
    }
    setProductQuantity(newQuantity); // Update the local state
    onQuantityChange(newQuantity);   // Call the parent function to pass the updated quantity
  };


  // const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.product.cart);

  // // Check if the product exists in the cart
  // const cartProduct = cartItems.find(item => item.id === product?.id);
  // const productQuantity = cartProduct ? cartProduct.quantity : 0;

  // const handleUpdateQuantity = (productId, quantity) => {
  //   if (quantity === 0) {
  //     // If quantity is zero, remove the product from the cart
  //     dispatch(removeProductFromCart(productId));
  //   } else if (quantity === 1 && productQuantity === 0) {
  //     // If it's the first click and the product is not in the cart, add it with quantity 1
  //     dispatch(addProductToCart({ ...product, quantity }));
  //   } else {
  //     // Update the product quantity
  //     dispatch(updateProductQuantity({ id: productId, quantity }));
  //   }
  // };


  return (
    <CounterContainer>

      <CounterButton onClick={() => handleUpdateQuantity(productQuantity - 1)}>
        -
      </CounterButton>
      <CounterValue>{productQuantity}</CounterValue>
      <CounterButton onClick={() => handleUpdateQuantity(productQuantity + 1)}>
        +
      </CounterButton>


      {/* <CounterButton onClick={() => handleUpdateQuantity(product?.id, productQuantity - 1)}>
        -
      </CounterButton>
      <CounterValue>{productQuantity}</CounterValue>
      <CounterButton onClick={() => handleUpdateQuantity(product?.id, productQuantity + 1)}>
        +
      </CounterButton> */}

    </CounterContainer>

  );
};

export default CountButton;


