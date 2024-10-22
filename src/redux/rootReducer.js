import { combineReducers } from 'redux';
import searchBarReducer from './slices/searchBar';
import medusaConfigReducer from './slices/medusaConfig';
import productSliceReducer from './slices/productSlice';
import categoriesSliceReducer from './slices/categoriesSlice';
import filterProductsSlice from './slices/filterProductsSlice';
import orderSlice from './slices/orderSlice';

// Combine all reducers
const appReducer = combineReducers({
    searchBar: searchBarReducer,
    medusaConfig: medusaConfigReducer,
    product: productSliceReducer,
    categories: categoriesSliceReducer,
    filterProducts: filterProductsSlice,
    order: orderSlice,
});

// Reset state on logout
// const rootReducer = (state, action) => {
//     if (action.type === 'USER_LOGOUT') {
//         state = undefined; // Reset the entire state
//     }
//     return appReducer(state, action);
// };


const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = {
            // searchBar: undefined,
            // medusaConfig: undefined,
            // product: undefined,
            // categories: undefined,
            // filterProducts: undefined,
            // order: undefined,
            ...state, // Preserve the existing state
            searchBar: undefined,
            medusaConfig: undefined,
            filterProducts: undefined,
            order: undefined,
        }; // Reset specific parts of the state
    }
    return appReducer(state, action);
};

export default rootReducer;
