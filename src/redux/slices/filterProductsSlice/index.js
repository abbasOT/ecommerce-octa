import { createSlice, } from '@reduxjs/toolkit';



const filterProductsSlice = createSlice({
    name: 'filterProducts',
    initialState: {
        priceRange: [50, 7000],
        // appliedPriceRange: [50, 7000],
        appliedPriceRange: [],
        stockStatus: [],
        size: [],
        color: [],
        sorting: "default",
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
        setSorting: (state, action) => {
            state.sorting = action.payload;
        },
    },

});

export const { setPriceRange, setAppliedPriceRange, setStockStatus, setSize, setColor, setSorting } = filterProductsSlice.actions;
export default filterProductsSlice.reducer;

