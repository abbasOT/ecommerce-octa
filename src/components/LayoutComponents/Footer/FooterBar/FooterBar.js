"use client"

import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CashonDelivery from "../../../Ui/Assets/Footer/CashonDelivery.svg";
import HundredpercentSecure from "../../../Ui/Assets/Footer/100percentSecure.svg";
import TrackandCancel from "../../../Ui/Assets/Footer/TrackandCancel.svg";
import SupportFull from "../../../Ui/Assets/Footer/24by7-Support.svg";
import { FooterMainStyles } from '@/components/Ui/Styles/Styles';

const footerBarData = [{ icon: CashonDelivery, text: "Cash on Delivery" }, { icon: HundredpercentSecure, text: "100% Secure" },
{ icon: TrackandCancel, text: "Track & Cancel" }, { icon: SupportFull, text: "24/7 Support" }];

function FooterBar() {
    return (
        <Box sx={FooterMainStyles.FooterBarBox}>
            {footerBarData.map((item, index) => (
                <Box key={index} sx={FooterMainStyles.FooterBarContentBox}>
                    <Image src={item.icon} />
                    <Typography sx={FooterMainStyles.FooterBarContentTypo}>
                        {item.text}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default FooterBar;
