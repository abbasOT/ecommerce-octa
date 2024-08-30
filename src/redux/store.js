import { configureStore } from '@reduxjs/toolkit'
import searchBarReducer from './slices/searchBar'
import medusaConfigReducer from './slices/medusaConfig'
import productSliceReducer from "./slices/productSlice"
import categoriesSliceReducer from './slices/categoriesSlice'
import filterProductsSlice from './slices/filterProductsSlice'
import orderSlice from './slices/orderSlice'

export const store = configureStore({
    reducer: {
        searchBar: searchBarReducer,
        medusaConfig: medusaConfigReducer,
        product: productSliceReducer,
        categories: categoriesSliceReducer,
        filterProducts: filterProductsSlice,
        order: orderSlice
    },
})