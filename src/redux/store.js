// import { configureStore } from '@reduxjs/toolkit'
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { combineReducers } from 'redux';

// import searchBarReducer from './slices/searchBar'
// import medusaConfigReducer from './slices/medusaConfig'
// import productSliceReducer from "./slices/productSlice"
// import categoriesSliceReducer from './slices/categoriesSlice'
// import filterProductsSlice from './slices/filterProductsSlice'
// import orderSlice from './slices/orderSlice'

// export const store = configureStore({
//     reducer: {
//         searchBar: searchBarReducer,
//         medusaConfig: medusaConfigReducer,
//         product: productSliceReducer,
//         categories: categoriesSliceReducer,
//         filterProducts: filterProductsSlice,
//         order: orderSlice
//     },
// })







import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './rootReducer';


import { combineReducers } from 'redux';
import searchBarReducer from './slices/searchBar';
import medusaConfigReducer from './slices/medusaConfig';
import productSliceReducer from './slices/productSlice';
import categoriesSliceReducer from './slices/categoriesSlice';
import filterProductsSlice from './slices/filterProductsSlice';
import orderSlice from './slices/orderSlice';

// Redux Persist Configuration
const persistConfig = {
    key: 'root', // Key in local storage
    storage, // Type of storage
    whitelist: ['order', 'product', 'categories',],
    blacklist: ['searchBar', 'filterProducts', 'medusaConfig'],
};

// Combine all your reducers into a rootReducer
// const rootReducer = combineReducers({
//     searchBar: searchBarReducer,
//     medusaConfig: medusaConfigReducer,
//     product: productSliceReducer,
//     categories: categoriesSliceReducer,
//     filterProducts: filterProductsSlice,
//     order: orderSlice,
// });

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Create a persistor instance to persist your store
export const persistor = persistStore(store);
