"use client"

import React from 'react'
import CountUp from "react-countup";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { StatsCardStyles } from '@/components/Ui/Styles/Styles';
function StatsCard() {
    const statsData = [
        { end: 210, suffix: "+", label: "Orders" },
        { end: 50, suffix: "+", label: "Happy Customers" },
        { end: 127, suffix: "+", label: "Products" },
        { end: 99, suffix: "%", label: "Same Day Dispatch" }
    ];
    return (
        <Grid containerspacing={2} sx={StatsCardStyles.gridStyle} >
            {statsData.map((stat, index) => (
                <div key={index} style={StatsCardStyles.countBox}>
                    <Typography className="txt-shine" variant="h3" component="p" sx={StatsCardStyles.contup}>
                        <CountUp end={stat.end} duration={10} /> {stat.suffix}
                    </Typography>
                    <Typography sx={StatsCardStyles.countupBottomText}>
                        {stat.label}
                    </Typography>
                </div>
            ))}
        </Grid>
    );
}

export default StatsCard
