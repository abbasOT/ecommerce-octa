

"use client";
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter
import { HeaderBarStyles, RegistrationStyles } from '@/components/Ui/Styles/Styles';

 const NavBar = () => {
    const [currentPath, setCurrentPath] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname(); 
    const router = useRouter(); 

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

    // Handle navigation using router.push instead of href
    const handleNavigation = (path) => {
        setDrawerOpen(false); // Close the drawer after navigating
        router.push(path); // Navigate to the route
    };

    const renderLinks = () => (
        <>
            <span style={getLinkStyle("/")} onClick={() => handleNavigation("/")}>
                Home
            </span>
            <span style={getLinkStyle("/shop")} onClick={() => handleNavigation("/shop")}>
                Shop
            </span>
            <span style={getLinkStyle("/about")} onClick={() => handleNavigation("/about")}>
                About Us
            </span>
            <span style={getLinkStyle("/contact")} onClick={() => handleNavigation("/contact")}>
                Contact
            </span>
            {/* <span style={getLinkStyle("/track-order")} onClick={() => handleNavigation("/track-order")}>
                Track Order
            </span> */}
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
                        <ListItem button onClick={() => handleNavigation("/")} selected={currentPath === "/"}>
                            <ListItemText style={getLinkStyle("/")} primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation("/shop")} selected={currentPath === "/shop"}>
                            <ListItemText style={getLinkStyle("/shop")} primary="Shop" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation("/about")} selected={currentPath === "/about"}>
                            <ListItemText style={getLinkStyle("/about")} primary="About Us" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation("/contact")} selected={currentPath === "/contact"}>
                            <ListItemText style={getLinkStyle("/contact")} primary="Contact" />
                        </ListItem>
                        {/* <ListItem button onClick={() => handleNavigation("/trackorder")} selected={currentPath === "/track-order"}>
                            <ListItemText style={getLinkStyle("/track-order")} primary="Track Order" />
                        </ListItem> */}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default NavBar;
