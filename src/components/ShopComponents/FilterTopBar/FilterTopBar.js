"use client"

import { Typography, Box, Select, MenuItem, Stack, Chip, IconButton, Divider, } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { FAQsStyles, ShopStyles, ProductDetailStyles } from '@/components/Ui/Styles/Styles'
import AppsIcon from '@mui/icons-material/Apps';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import { useSelector, useDispatch } from 'react-redux';
import { setStockStatus, setSize, setColor, setAppliedPriceRange } from '@/redux/slices/filterProductsSlice';

import React, { useState } from 'react'

function FilterTopBar() {


    const dispatch = useDispatch();
    const stockStatus = useSelector(state => state.filterProducts.stockStatus);
    const size = useSelector(state => state.filterProducts.size);
    const color = useSelector(state => state.filterProducts.color);
    const appliedPriceRange = useSelector(state => state.filterProducts.appliedPriceRange);

    const [selectedDeviceType, setSelectedDeviceType] = useState("Select Device Type");
    const selectedCategory = useSelector((state) => state.categories.selectedCategory);
    const selectedCategoryProductCount = useSelector((state) => state.categories.selectedCategorywithProducts);

    const handleDelete = (type, id) => {
        switch (type) {
            case 'stockStatus':
                dispatch(setStockStatus(stockStatus.filter(item => item !== id)));
                break;
            case 'size':
                dispatch(setSize(size.filter(item => item !== id)));
                break;
            case 'color':
                dispatch(setColor(color.filter(item => item !== id)));
                break;
            case 'appliedPriceRange':
                dispatch(setAppliedPriceRange([0, 900])); // Assuming default applied price range
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Box sx={ShopStyles.filterTopBarContainerBox}>
                <Typography sx={{ ...FAQsStyles.title, }}>
                    {selectedCategory} {selectedCategoryProductCount && selectedCategoryProductCount.length > 0 ? `(${selectedCategoryProductCount.length})` : ''}

                </Typography>
                <Box sx={ShopStyles.filterTopBarButtonBox}>
                    <Select
                        sx={{ ...ProductDetailStyles.productReviewsSelectField, ...ShopStyles.filterTopBarSelect }}
                        id="deviceType"
                        value={selectedDeviceType}
                        onChange={(e) => setSelectedDeviceType(e.target.value)}
                    >
                        <MenuItem value="Select Device Type">
                            <Typography component="span" sx={ShopStyles.filterTopBarSelectSpanTypo}>Sort By</Typography> Default
                        </MenuItem>
                        <MenuItem value="Single-Phase">Old</MenuItem>
                        <MenuItem value="3-Phase">All</MenuItem>
                    </Select>

                    <Box sx={ShopStyles.filterTopBarIconBox}>
                        <AppsIcon />
                    </Box>
                    <Box sx={{ ...ShopStyles.filterTopBarIconBox, marginLeft: "-1.7rem", }}>
                        <ViewStreamIcon />
                    </Box>
                </Box>
            </Box>

            <Box sx={ShopStyles.filterChipsBox}>
                {appliedPriceRange.length > 0 && (
                    <Chip
                        label={`Price: $${appliedPriceRange[0]} - $${appliedPriceRange[1]}`}
                        variant="outlined"
                        sx={{ borderRadius: "0.25rem", mr: 1 }}
                        deleteIcon={<CloseIcon fontSize="small" sx={{ color: '#000' }} />}
                        onDelete={() => handleDelete('appliedPriceRange')}
                    />
                )}
                {stockStatus.map((status, index) => (
                    <Chip
                        key={index}
                        label={status}
                        variant="outlined"
                        sx={{ borderRadius: "0.25rem" }}
                        deleteIcon={
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Divider orientation="vertical" flexItem />
                                <CloseIcon fontSize="small" sx={{ color: '#000' }} />
                            </Stack>
                        }
                        onDelete={() => handleDelete('stockStatus', status)}
                    />
                ))}
                {size.map((sz, index) => (
                    <Chip
                        key={index}
                        label={sz}
                        variant="outlined"
                        sx={{ borderRadius: "0.25rem", ml: 1 }}
                        deleteIcon={
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Divider orientation="vertical" flexItem />
                                <CloseIcon fontSize="small" sx={{ color: '#000' }} />
                            </Stack>
                        }
                        onDelete={() => handleDelete('size', sz)}
                    />
                ))}
                {color.map((clr, index) => (
                    <Chip
                        key={index}
                        label={clr}
                        variant="outlined"
                        sx={{ borderRadius: "0.25rem", ml: 1 }}
                        deleteIcon={
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Divider orientation="vertical" flexItem />
                                <CloseIcon fontSize="small" sx={{ color: '#000' }} />
                            </Stack>
                        }
                        onDelete={() => handleDelete('color', clr)}
                    />
                ))}
            </Box>
        </>
    )
}

export default FilterTopBar
