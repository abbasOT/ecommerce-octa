"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Box, Button, Divider } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { MyAccountStyles } from "@/components/Ui/Styles/Styles";

function SideBar({ activeComponent }) {
    const router = useRouter();
    const [selectedButton, setSelectedButton] = useState(activeComponent);

    useEffect(() => {
        setSelectedButton(activeComponent);
    }, [activeComponent]);

    const handleButtonClick = (component) => {
        setSelectedButton(component);
        router.push(`/my-account/${component}`);
    };

    const isActive = (button) => selectedButton === button;
    const getButtonBackgroundColor = (buttonName) => (isActive(buttonName) ? '#F6F6F6' : 'transparent');

    return (
        <>
            <Box sx={MyAccountStyles.sideBarOuterBox}>
                <Box sx={MyAccountStyles.sideBarContentBox}>
                    <Button
                        sx={{ ...MyAccountStyles.sideBarSelectButton, backgroundColor: getButtonBackgroundColor('OrderHistory') }}
                        onClick={() => handleButtonClick('OrderHistory')}
                    >
                        <ShoppingCartOutlinedIcon />
                        Order History
                    </Button>
                    <Button
                        sx={{ ...MyAccountStyles.sideBarSelectButton, backgroundColor: getButtonBackgroundColor('Wishlist') }}
                        onClick={() => handleButtonClick('Wishlist')}
                    >
                        <FavoriteBorderOutlinedIcon />
                        Wishlist
                    </Button>
                    {/* <Button
                        sx={{ ...MyAccountStyles.sideBarSelectButton, backgroundColor: getButtonBackgroundColor('ChangePassword') }}
                        onClick={() => handleButtonClick('ChangePassword')}
                    >
                        <VpnKeyOutlinedIcon sx={{ transform: 'rotate(300deg)' }} />
                        Password
                    </Button> */}
                </Box>
                <Divider orientation="vertical" flexItem sx={MyAccountStyles.sideBarDividerStyle} />
            </Box>
        </>
    );
}

export default SideBar;
