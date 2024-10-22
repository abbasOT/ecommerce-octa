// src/redux/store/categoriesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import images
import Accessories from "../../../components/Ui/Assets/Shop/Accessories.svg";
import Connectivity from "../../../components/Ui/Assets/Shop/connectivity.svg";
import Electronics from "../../../components/Ui/Assets/Shop/Electronics.svg";
import Motors from "../../../components/Ui/Assets/Shop/Motors.svg";
import Resistors from "../../../components/Ui/Assets/Shop/Resistors.svg";
import Robotics from "../../../components/Ui/Assets/Shop/Robotics.svg";
import Slider from "../../../components/Ui/Assets/Shop/Slider.svg";
import Uncategorized from "../../../components/Ui/Assets/Shop/Uncategorized.svg";
import BreakBoards from "../../../components/Ui/Assets/Shop/BreakoutBoards.svg";


// Thunk for fetching categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (medusa) => {
    const response = await medusa.productCategories.list();
    return response.product_categories.map(category => {
        // Find corresponding image and count for each category
        let image;
        switch (category.name) {
            case "Accessories":
                image = Accessories;
                break;
            case "Connectivity":
                image = Connectivity;
                break;
            case "Discrete Electronic Components":
                image = Electronics;
                break;
            case "Modules & Breakout Boards":
                image = BreakBoards;
                break;
            case "Motors & Drivers":
                image = Motors;
                break;
            case "Resistors":
                image = Resistors;
                break;
            case "Robotics & Machines":
                image = Robotics;
                break;
            case "Slider":
                image = Slider;
                break;
            default:
                image = Uncategorized;
                break;
        }
        return { ...category, image };
    });
});



const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        allCategories: [],
        selectedCategory: "",
        allCategoriesWithProducts: [],
        selectedCategorywithProducts: [],
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setAllCategoriesWithProducts: (state, action) => {
            state.allCategoriesWithProducts = action.payload;
        },
        setSelectedCategoryWithProducts: (state, action) => {
            state.selectedCategorywithProducts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.allCategories = action.payload;
            });

    },
});

export const { setSelectedCategory, setAllCategoriesWithProducts, setSelectedCategoryWithProducts } = categoriesSlice.actions;
export default categoriesSlice.reducer;
