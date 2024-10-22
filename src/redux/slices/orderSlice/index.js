
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    customerId: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    streetAddress: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: '',
    referenceNumber: '',
    paymentSecreenShotURL: '',
    status: 'pending',
    totalAmount: '',
    subTotalAmount: '',
    items: []
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateOrderValue: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
    },
});

export const { updateOrderValue } = orderSlice.actions;

export default orderSlice.reducer;
