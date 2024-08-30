import React from 'react';
import ProductDetailTable from '../ProductDetailTable/ProductDetailTable';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { AboutUsMainStyles, WhyChooseUsStyles, ProductDetailStyles } from '@/components/Ui/Styles/Styles';

// Data array containing descriptions
const descriptions = [
    "Premium Quality",
    "Versatile Wardrobe Staple",
    "Available in Various Sizes",
    "Tailored Fit"
];

function ProductDescription() {
    const product = useSelector((state) => state.product.selectedProduct);
    return (
        <>
            <ProductDetailTable />
            <Box sx={{ margin: "2rem 0rem" }}>
                <Typography sx={{ ...WhyChooseUsStyles.WhyChooseUsTitle, ...AboutUsMainStyles.firstTypoTitle, ...AboutUsMainStyles.secondTypoTitle, pb: 0 }}>
                    Detail
                </Typography>
                <Typography sx={{ ...AboutUsMainStyles.subTitleTypo, ...ProductDetailStyles.productDiscriptionPara }}>
                    {product?.description}
                </Typography>
                <Box component="ul" sx={ProductDetailStyles.productDiscriptionPointsBox}>
                    {descriptions.map((description, index) => (
                        <li key={index}>
                            <Typography variant="body1" sx={{ ...AboutUsMainStyles.subTitleTypo, ...ProductDetailStyles.productDiscriptionPara }}>
                                {description}
                            </Typography>
                        </li>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default ProductDescription;
