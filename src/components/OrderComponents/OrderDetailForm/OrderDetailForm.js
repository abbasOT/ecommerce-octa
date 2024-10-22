"use client"

import React, { useState } from 'react'
import { CldUploadButton } from 'next-cloudinary';
import { Grid, InputLabel, TextField, Box, Button, Typography, Divider, Select, MenuItem, Checkbox, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material'
import { FooterMainStyles, ContactFormStyles, WhyChooseUsStyles, RegistrationStyles, CategoriesCardStyles, FAQsStyles, OrderStyles } from '@/components/Ui/Styles/Styles'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { updateOrderValue } from '@/redux/slices/orderSlice';
import { useSelector, useDispatch } from 'react-redux';


function OrderDetailForm() {


    const dispatch = useDispatch();
    const formValues = useSelector((state) => state.order);

    const handleChangeValues = (e) => {
        const { name, value } = e.target;
        dispatch(updateOrderValue({ name, value }));
    };

    console.log(formValues, "the form values are")

    const paymentMethods = [
        { value: 'Pay by Card Credit', label: 'Pay by Card Credit', icon: <CreditCardOutlinedIcon /> },
        { value: 'Jazz Cash', label: 'Jazz Cash' },
        { value: 'Easy paisa', label: 'Easy paisa' },
        { value: 'Cash on Delivery', label: 'Cash on Delivery' }
    ];

    const handlePaymentMethodChange = (event) => {
        const { value } = event.target;
        dispatch(updateOrderValue({ name: 'paymentMethod', value }));
    };

    const handleUpload = (result) => {
        if (result.event === 'success') {
            dispatch(updateOrderValue({ name: 'paymentScreenShotURL', value: result.info.secure_url }));
        }
    };



    return (


        <form   >
            <Typography sx={{ ...FAQsStyles.title, ...OrderStyles.orderDetailFormTitleTypo }}>Contact Information</Typography>
            <Box sx={FooterMainStyles.firstGrid}>
                <Box sx={ContactFormStyles.fieldBox}>
                    <Box sx={OrderStyles.orderDetailFormFlexBox}>
                        <Box width={"50%"}>
                            <InputLabel sx={CategoriesCardStyles.listItemText} >FIRST NAME</InputLabel>
                            <TextField
                                sx={RegistrationStyles.textField}
                                id="name"
                                placeholder="First Name"
                                name="firstName"
                                value={formValues.firstName}
                                autoComplete="off"
                                type="name"
                                inputProps={OrderStyles.orderDetailFormFieldInputProps}
                                variant="outlined"
                                onChange={handleChangeValues}
                                fullWidth

                            />
                        </Box>
                        <Box width={"50%"}>
                            <InputLabel sx={CategoriesCardStyles.listItemText} >LAST NAME</InputLabel>
                            <TextField

                                sx={RegistrationStyles.textField}
                                id="lastname"
                                placeholder="Last Name"
                                name="lastName"
                                value={formValues.lastName}
                                autoComplete="off"
                                type="name"
                                inputProps={OrderStyles.orderDetailFormFieldInputProps}
                                variant="outlined"
                                onChange={handleChangeValues}
                                fullWidth
                            />
                        </Box>
                    </Box>


                </Box>
                <Box sx={ContactFormStyles.fieldBox}>
                    <InputLabel sx={CategoriesCardStyles.listItemText} >PHONE NUMBER</InputLabel>

                    <TextField
                        sx={RegistrationStyles.textField}
                        id="email"
                        placeholder="Phone number"
                        name="phone"
                        value={formValues.phone}
                        type="phone"
                        variant="outlined"
                        autoComplete="off"
                        onChange={handleChangeValues}
                        inputProps={OrderStyles.orderDetailFormFieldInputProps}
                        fullWidth

                    />

                </Box>
                <Box sx={ContactFormStyles.fieldBox}>
                    <InputLabel sx={CategoriesCardStyles.listItemText} >EMAIL ADDRESS</InputLabel>

                    <TextField
                        sx={RegistrationStyles.textField}
                        id="email"
                        placeholder="Your Email"
                        name="email"
                        value={formValues.email}
                        type="email"
                        variant="outlined"
                        autoComplete="off"
                        onChange={handleChangeValues}
                        inputProps={{ ...OrderStyles.orderDetailFormFieldInputProps, maxLength: 40 }}
                        fullWidth
                    />

                </Box>
            </Box>
            <Divider sx={OrderStyles.orderDetailFormDividerStyle}></Divider>



            <Typography sx={{ ...FAQsStyles.title, ...OrderStyles.orderDetailFormTitleTypo }}>Shipping Address</Typography>
            <Box sx={FooterMainStyles.firstGrid}>
                <Box sx={ContactFormStyles.fieldBox}>
                    <InputLabel sx={CategoriesCardStyles.listItemText} >STREET ADDRESS</InputLabel>

                    <TextField
                        sx={RegistrationStyles.textField}
                        id="email"
                        placeholder="Stress Address"
                        name="streetAddress"
                        value={formValues.streetAddress}
                        type="text"
                        variant="outlined"
                        autoComplete="off"
                        onChange={handleChangeValues}
                        inputProps={{ ...OrderStyles.orderDetailFormFieldInputProps, maxLength: 60 }}
                        fullWidth
                    />

                </Box>

                <Box sx={ContactFormStyles.fieldBox}>
                    <InputLabel sx={CategoriesCardStyles.listItemText} >COUNTRY</InputLabel>


                    <Select
                        id="deviceType"
                        name="country"
                        value={formValues.country}
                        onChange={handleChangeValues}
                        defaultValue="1"
                        fullWidth
                        sx={OrderStyles.orderDetailFormSelectField}
                    >
                        <MenuItem value="0" disabled>Country</MenuItem>
                        <MenuItem value="Pakistan">Pakistan</MenuItem>
                        <MenuItem value="France">France</MenuItem>
                    </Select>


                </Box>
                <Box sx={ContactFormStyles.fieldBox}>
                    <InputLabel sx={CategoriesCardStyles.listItemText} >TOWN / CITY</InputLabel>
                    <TextField

                        sx={RegistrationStyles.textField}
                        id="name"
                        name="city"
                        value={formValues.city}
                        placeholder="Town / City"
                        autoComplete="off"
                        type="name"
                        inputProps={OrderStyles.orderDetailFormFieldInputProps}
                        variant="outlined"
                        fullWidth
                        onChange={handleChangeValues}


                    />
                </Box>
                <Box sx={ContactFormStyles.fieldBox}>
                    <Box sx={OrderStyles.orderDetailFormFlexBox}>
                        <Box width={"50%"}>
                            <InputLabel sx={CategoriesCardStyles.listItemText} >STATE</InputLabel>
                            <TextField

                                sx={RegistrationStyles.textField}
                                name="state"
                                value={formValues.state}
                                onChange={handleChangeValues}
                                id="name"
                                placeholder="State"
                                autoComplete="off"
                                type="name"
                                inputProps={OrderStyles.orderDetailFormFieldInputProps}
                                variant="outlined"
                                fullWidth


                            />
                        </Box>
                        <Box width={"50%"}>
                            <InputLabel sx={CategoriesCardStyles.listItemText} >ZIP CODE</InputLabel>
                            <TextField

                                sx={RegistrationStyles.textField}
                                id="name"
                                placeholder="Zip Code"
                                name="zipCode"
                                value={formValues.zipCode}
                                autoComplete="off"
                                onChange={handleChangeValues}
                                type="name"
                                inputProps={{ ...OrderStyles.orderDetailFormFieldInputProps, maxLength: 5 }}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                    </Box>
                </Box>

            </Box>
            <Box sx={OrderStyles.orderDetailFormCheckboxContainerBox}>
                <Checkbox
                    id="agreeTerms"
                    sx={{ ...RegistrationStyles.checkBoxStyle, marginTop: "-0.1rem" }}
                />
                <Typography sx={{ ...RegistrationStyles.subTitle, ...RegistrationStyles.checkBoxTypo }} >
                    Use a different billing address (optional)
                </Typography>
            </Box>
            <Divider sx={OrderStyles.orderDetailFormDividerStyle}></Divider>

            <Typography sx={{ ...FAQsStyles.title, ...OrderStyles.orderDetailFormTitleTypo }}>Payment Method</Typography>


            <Box>
                {paymentMethods.map((method, index) => (
                    <Box
                        key={index}
                        sx={{ ...OrderStyles.orderDetailFormPaymentFieldBox, background: index === 0 ? '#F3F3F3' : 'transparent' }}
                    >
                        <RadioGroup
                            aria-labelledby={`payment-option-${index}`}
                            name={`payment-option-${index}`}
                            value={formValues.paymentMethod} // Bind to formValues
                            onChange={handlePaymentMethodChange}
                        >
                            <FormControlLabel
                                value={method.value}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { color: 'black' } }} />} // Ensure the radio button color is black
                                label={method.label}
                            />
                        </RadioGroup>
                        {method.icon && method.icon}
                    </Box>
                ))}


                <Divider sx={OrderStyles.orderDetailFormDividerStyle}></Divider>
            </Box>
            <Box sx={FooterMainStyles.firstGrid}>
                {/* <Box sx={ContactFormStyles.fieldBox}>
                    <InputLabel sx={CategoriesCardStyles.listItemText} >REFRENCE NUMBER</InputLabel>
                    <TextField

                        sx={RegistrationStyles.textField}
                        id="name"
                        placeholder="1234 1234 1234"
                        name="referenceNumber"
                        value={formValues.referenceNumber}
                        autoComplete="off"
                        type="name"
                        onChange={handleChangeValues}
                        inputProps={OrderStyles.orderDetailFormFieldInputProps}
                        variant="outlined"
                        fullWidth
                    />
                </Box> */}


                <Box sx={ContactFormStyles.fieldBox}>
                    <InputLabel sx={CategoriesCardStyles.listItemText}>PAYMENT SCREENSHOT</InputLabel>
                    <CldUploadButton style={buttonStyle} uploadPreset="Ecommerce_Octa" onUpload={handleUpload} />

                </Box>
            </Box>
        </form>


    )
}

export default OrderDetailForm



const buttonStyle = {
    background: 'var(--primary-color)',
    fontFamily: 'var(--font-family-primary)',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '5px',
};




{/* <Box sx={OrderStyles.orderDetailFormFlexBox}>
                        <Box width={"50%"}>
                            <InputLabel sx={CategoriesCardStyles.listItemText} >EXPIRATION DATE</InputLabel>
                            <TextField

                                sx={RegistrationStyles.textField}
                                id="name"
                                placeholder="MM/YY"
                                name="name"
                                autoComplete="off"
                                type="name"
                                inputProps={OrderStyles.orderDetailFormFieldInputProps}
                                variant="outlined"
                                fullWidth


                            />
                        </Box>
                        <Box width={"50%"}>
                            <InputLabel sx={CategoriesCardStyles.listItemText} >CVC</InputLabel>
                            <TextField

                                sx={RegistrationStyles.textField}
                                id="name"
                                placeholder="CVC code"
                                name="name"
                                autoComplete="off"
                                type="name"
                                inputProps={OrderStyles.orderDetailFormFieldInputProps}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>       
                    </Box>
                     */}