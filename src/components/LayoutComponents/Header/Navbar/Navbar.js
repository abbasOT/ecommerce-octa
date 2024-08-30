"use client"
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname, } from 'next/navigation';
import { HeaderBarStyles, RegistrationStyles } from '@/components/Ui/Styles/Styles';

function NavBar() {
    const [currentPath, setCurrentPath] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setCurrentPath(pathname);
    }, [pathname]);

    const getLinkStyle = (path) => ({
        ...RegistrationStyles.linkStyle,
        ...HeaderBarStyles.navbarLinksColor,
        ...(currentPath === path && { color: 'var(--primary-color)' })
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const renderLinks = () => (
        <>
            <Link style={getLinkStyle("/")} href="/">
                Home
            </Link>
            <Link style={getLinkStyle("/shop")} href="/shop">
                Shop
            </Link>
            <Link style={getLinkStyle("/about")} href="/about">
                About Us
            </Link>
            <Link style={getLinkStyle("/contact")} href="/contact">
                Contact
            </Link>
            <Link style={getLinkStyle("/track-order")} href="/track-order">
                Track Order
            </Link>
        </>
    );

    return (
        <>
            <Box sx={HeaderBarStyles.navbarLinksBox}>
                {renderLinks()}
            </Box>
            <Box sx={HeaderBarStyles.navbarLinksDrawerBox}>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
            </Box>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <List>
                        <ListItem button component="a" href="/" selected={currentPath === "/"}>
                            <ListItemText style={getLinkStyle("/")} primary="Home" />
                        </ListItem>
                        <ListItem button component="a" href="/shop" selected={currentPath === "/shop"}>
                            <ListItemText style={getLinkStyle("/shop")} primary="Shop" />
                        </ListItem>
                        <ListItem button component="a" href="/about" selected={currentPath === "/aboutus"}>
                            <ListItemText style={getLinkStyle("/about")} primary="About Us" />
                        </ListItem>
                        <ListItem button component="a" href="/contact" selected={currentPath === "/contact"}>
                            <ListItemText style={getLinkStyle("/contact")} primary="Contact" />
                        </ListItem>
                        <ListItem button component="a" href="/trackorder" selected={currentPath === "/track-order"}>
                            <ListItemText style={getLinkStyle("/track-order")} primary="Track Order" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default NavBar;
