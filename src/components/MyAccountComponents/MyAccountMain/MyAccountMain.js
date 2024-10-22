"use client"
import React, { useState, useEffect, } from 'react';
import { useParams } from 'next/navigation';
import SideBar from '../SideBar/SideBar';
import { Grid } from '@mui/material';
// import ChangePassword from '../ChangePassword/ChangePassword';
import OrderHistory from '../OrderHistory/OrderHistory';
import Wishlist from '../Wishlist/Wishlist';
import { MyAccountStyles } from '@/components/Ui/Styles/Styles';

function MyAccountMain() {
    const { activecomp } = useParams();

    const [activeComponent, setActiveComponent] = useState('OrderHistory');

    useEffect(() => {
        setActiveComponent(activecomp);
    }, [activecomp]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={4} lg={3} xl={2.2} height="auto" sx={MyAccountStyles.sidebar}>
                <SideBar activeComponent={activeComponent} />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9} xl={9.8}>
                {activeComponent === 'OrderHistory' && <OrderHistory />}
                {activeComponent === 'Wishlist' && <Wishlist />}
                {/* {activeComponentState === 'ChangePassword' && <ChangePassword />} */}
            </Grid>
        </Grid>
    );
}

export default MyAccountMain;




