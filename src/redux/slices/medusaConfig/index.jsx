import { createSlice } from "@reduxjs/toolkit";
// import Medusa from "@medusajs/medusa-js"

const customerId = typeof window !== 'undefined' ? localStorage.getItem("customerId") : "";

// const medusa = new Medusa({ baseUrl: "http://192.168.18.13:9000", maxRetries: 3 });


const initialState = {
    medusa: "medusa",
    customer_id: customerId || ""
};

export const medusaConfig = createSlice({
    name: "medusaConfig",
    initialState,
    reducers: {
        medusaValues: (state, action) => {
            const { medusa } = action.payload;
            state.medusa = medusa;
        },

        customer_id: (state, action) => {
            state.customer_id = action.payload;
        },

    },
});

// Action creators are generated for each case reducer function
export const { medusaValues, customer_id } = medusaConfig.actions;

export default medusaConfig.reducer;