import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    searchQuery: '',
    searchValue:""
};

export const searchBar = createSlice({
    name: "searchBar",
    initialState,
    reducers: {
        searchValues: (state, action) => {
            const { searchQuery } = action.payload;
            state.searchQuery = searchQuery;
        },
        searchValue: (state, action) => {
            const { searchValue } = action.payload;
            state.searchValue = searchValue;
        },

    },
});

// Action creators are generated for each case reducer function
export const { searchValues, searchValue } = searchBar.actions;

export default searchBar.reducer;