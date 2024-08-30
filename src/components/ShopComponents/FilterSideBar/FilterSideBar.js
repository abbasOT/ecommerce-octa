import React, { useState } from 'react';
import { Box, Typography, Slider, Button, Checkbox } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import { BreadCrumbStyles, CategoriesCardStyles, ContactFormStyles, DisplayProductsStyles, FAQsStyles, FooterMainStyles, RegistrationStyles, ShopStyles } from '@/components/Ui/Styles/Styles';
import ProductImg from "../../Ui/Assets/Shop/FilterProductImg.svg";
import { CustomSlider } from '@/components/Ui/CustomSlider/CustomSlider';
import { FilterOption } from '../FilterOption/FilterOption';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange, setAppliedPriceRange, setStockStatus, setSize, setColor } from '@/redux/slices/filterProductsSlice';



function FilterSideBar() {

    const dispatch = useDispatch();

    function valuetext(value) {
        return `${value}`;
    }

    const priceRange = useSelector((state) => state.filterProducts.priceRange)

    const selectedStockStatus = useSelector((state) => state.filterProducts.stockStatus) || []; // Default to empty array if null/undefined
    const selectedSize = useSelector((state) => state.filterProducts.size) || []; // Default to empty array if null/undefined
    const selectedColor = useSelector((state) => state.filterProducts.color) || []; // Default to empty array if null/undefined



    const handleChange = (event, newValue) => {
        dispatch(setPriceRange(newValue));
    };

    const handlePriceRangeApply = () => {
        dispatch(setAppliedPriceRange(priceRange));
    }

    const handleStockStatusChange = (selectedOptions) => {
        dispatch(setStockStatus(selectedOptions));
    };

    const handleSizeChange = (selectedOptions) => {
        dispatch(setSize(selectedOptions));
    };

    const handleColorChange = (selectedOptions) => {
        dispatch(setColor(selectedOptions));
    };

    const stockStatusOptions = [
        { id: 'onSale', label: 'On sale' },
        { id: 'inStock', label: 'In stock' }
        // Add more stock status options as needed
    ];

    const sizeOptions = [
        { id: 'large', label: 'Large' },
        { id: 'medium', label: 'Medium' },
        { id: 'small', label: 'Small' }
        // Add more size options as needed
    ];

    const colorOptions = [
        { id: 'red', label: 'Red' },
        { id: 'blue', label: 'Blue' },
        { id: 'green', label: 'Green' },
        { id: 'yellow', label: 'Yellow' },
        { id: 'orange', label: 'Orange' },
        { id: 'black', label: 'Black' }
        // Add more color options as needed
    ];

    return (
        <Box sx={ShopStyles.filterSideBarContainerBox}>
            <Box sx={BreadCrumbStyles.contentBox}>
                <TuneIcon />
                <Typography sx={{ ...FAQsStyles.title, p: 0 }}>Filter</Typography>
            </Box>

            <Box Box sx={DisplayProductsStyles.headingContainerBox}>
                <Typography sx={{ ...CategoriesCardStyles.listItemText, ...ShopStyles.shopFilterOptionTypo }} >
                    Price, $
                </Typography>
                <ExpandMoreIcon />
            </Box >

            <Box sx={ShopStyles.filterSideBarSliderContainer}>
                <CustomSlider

                    value={priceRange}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={900}
                />
                <Box sx={ShopStyles.filterSideBarButtonBox}>
                    <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, ...ShopStyles.filterSideBarPriceRangeButton }} >${priceRange[0]} - ${priceRange[1]}</Button>
                    <Button variant="contained" type='submit' sx={{ ...FooterMainStyles.buttonStyle, ...ContactFormStyles.sendMessageButton, ...ShopStyles.filterSideBarApplyButton }} onClick={handlePriceRangeApply}>Apply</Button>
                </Box>
            </Box>

            {/* <FilterOption title="Stock Status" options={stockStatusOptions} onChange={handleStockStatusChange} />
            <FilterOption title="By Size" options={sizeOptions} onChange={handleSizeChange} />
            <FilterOption title="By Color" options={colorOptions} onChange={handleColorChange} /> */}


            <FilterOption title="Stock Status" options={stockStatusOptions} selectedOptions={selectedStockStatus} onChange={handleStockStatusChange} />
            <FilterOption title="By Size" options={sizeOptions} selectedOptions={selectedSize} onChange={handleSizeChange} />
            <FilterOption title="By Color" options={colorOptions} selectedOptions={selectedColor} onChange={handleColorChange} />

            <Box sx={DisplayProductsStyles.headingContainerBox}>
                <Typography sx={{ ...CategoriesCardStyles.listItemText, ...ShopStyles.shopFilterOptionTypo }}>Top Rated Products</Typography>
                <ExpandMoreIcon />
            </Box>
            <Box>
                <Image src={ProductImg} width={80} />
                <Image src={ProductImg} width={80} />
                <Image src={ProductImg} width={80} />
            </Box>
        </Box>
    );
}

export default FilterSideBar;





