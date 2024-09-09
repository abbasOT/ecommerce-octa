import { createSlice, } from '@reduxjs/toolkit';



const filterProductsSlice = createSlice({
    name: 'filterProducts',
    initialState: {
        priceRange: [50, 7000],
        appliedPriceRange: [50, 7000],
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

