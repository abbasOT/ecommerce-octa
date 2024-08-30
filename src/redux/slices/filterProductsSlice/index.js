import { createSlice, } from '@reduxjs/toolkit';



const filterProductsSlice = createSlice({
    name: 'filterProducts',
    initialState: {
        priceRange: [100, 300],
        appliedPriceRange: [0, 900],
        stockStatus: [],
        size: [],
        color: [],
    },
    reducers: {
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        setAppliedPriceRange: (state, action) => {
            state.appliedPriceRange = action.payload;
        },
        setStockStatus: (state, action) => {
            state.stockStatus = action.payload;
        },
        setSize: (state, action) => {
            state.size = action.payload;
        },
        setColor: (state, action) => {
            state.color = action.payload;
        },
    },

});

export const { setPriceRange, setAppliedPriceRange, setStockStatus, setSize, setColor } = filterProductsSlice.actions;
export default filterProductsSlice.reducer;

