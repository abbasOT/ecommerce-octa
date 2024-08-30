import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    searchQuery: '',
};

export const searchBar = createSlice({
    name: "searchBar",
    initialState,
    reducers: {
        searchValues: (state, action) => {
            const { searchQuery } = action.payload;
            state.searchQuery = searchQuery;
        },

    },
});

// Action creators are generated for each case reducer function
export const { searchValues } = searchBar.actions;

export default searchBar.reducer;