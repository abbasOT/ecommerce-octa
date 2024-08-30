import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProducts: [],
    cart: [],
    wishList: [],
    selectedProduct: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // addProductToCart: (state, action) => {
        //     state.cart.push(action.payload);
        // },
        addProductToCart: (state, action) => {
            const existingProduct = state.cart.find(product => product.id === action.payload.id);

            if (existingProduct) {
                existingProduct.quantity += 1; // Increase quantity if product already in cart
            } else {
                state.cart.push({ ...action.payload, quantity: 1 }); // Add new product with quantity 1
            }
        },
        removeProductFromCart: (state, action) => {
            state.cart = (state.cart ?? []).filter(product => product.id !== action.payload);
        },
        updateProductQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.cart.find(product => product.id === id);

            if (product) {
                product.quantity = quantity; // Update quantity
            }
        },
        addProductToWishList: (state, action) => {
            // Check if the product already exists in the wishlist
            const productExists = (state.wishList ?? []).some(product => product.id === action.payload.id);
            if (!productExists) {
                state.wishList.push(action.payload);
            }
        },
        removeProductFromWishList: (state, action) => {
            state.wishList = (state.wishList ?? []).filter(product => product.id !== action.payload);
        },
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        allProducts: (state, action) => {
            state.allProducts = action.payload;
        },
    },
});

export const { addProductToCart, removeProductFromCart, addProductToWishList, removeProductFromWishList, selectProduct, updateProductQuantity, allProducts } = productSlice.actions;
export default productSlice.reducer;
