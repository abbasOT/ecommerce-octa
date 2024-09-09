"use client"


export const RegistrationStyles = {
    LogoBox: {
        position: { lg: "absolute", md: "relative" }, top: "1rem", left: 0, marginLeft: { lg: "5rem", sm: "0rem" }, marginBottom: "1rem", textAlign: "start"
    },
    outerBox: {
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "3rem 0.5rem 5rem 0.5rem", height: "100%", position: "relative"
    },
    formBox: {
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "20px", padding: { sm: "1rem 1.5rem 0.5rem 1.5rem", xs: "1rem 1rem 0.5rem 1rem" }, background: "#FFFFFF", width: "auto", position: "relative", boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.03), 0px 3px 11px 0px rgba(0, 0, 0, 0.06)'
    },
    title: {
        fontSize: "2rem", fontFamily: 'var(--font-family-primary)', color: "#090914", fontWeight: 600, textAlign: "center",
    },
    subTitle: {
        fontFamily: 'var(--font-family-primary)', color: "#71717A", fontWeight: 400, fontFamily: 'var(--font-family-secondary)', fontSize: "0.9rem", textAlign: "center", pt: "0.2rem", padding: "1rem 0rem"
    },
    textField: {
        '& .MuiInputBase-root.MuiOutlinedInput-root': {
            borderRadius: "0.5rem",
            border: '1px solid #E4E4E7',
            color: "#52525B",
            fontFamily: 'var(--font-family-secondary)',
            margin: "0.5rem 0rem 1rem 0rem",
            '& input::placeholder': {
                color: '#52525B',
                opacity: 1,
                paddingLeft: "1rem"
            },
        },

    },
    fieldBox: {
        width: { md: "450px", sm: "430px", xs: "100%" },
    },
    buttonBox: {
        display: 'flex', justifyContent: 'center', flexDirection: "column"
    },
    buttonStyle: {
        background: 'var(--primary-color)', color: "#FFFFFF", textTransform: "none", fontFamily: 'var(--font-family-primary)', fontWeight: 600, fontSize: "1rem", marginTop: "1.2rem", padding: "1rem", borderRadius: "4px",
        '&:hover': {
            background: 'var(--primary-color)',
            color: "#FAF9F6"
        },
        width: "100%"
    },
    googleButton: {
        background: '#F8FAFC', color: "#1E293B",
        display: "flex", gap: "1rem",
        '&:hover': {
            background: '#F8FAFC',
            color: "#1E293B"
        },
    },
    linkStyle: {
        color: 'var(--primary-color)', fontWeight: 600, fontSize: "0.9rem", textTransform: "none", textDecoration: "none", fontFamily: 'var(--font-family-primary)', cursor: "pointer"
    },
    linkBox: {
        display: 'flex', justifyContent: 'center', padding: "2rem 1rem", alignItems: "center", gap: "1rem"
    },
    linksContainerBox: {
        display: "flex", justifyContent: "space-between", gap: "0.5rem", marginTop: "0.5rem"
    },
    checkBoxStyle: {
        "&.Mui-checked": {
            color: 'var(--primary-color)',
        },
    },
    checkBoxTypo: {
        margin: "0rem", paddingTop: "0.6rem", color: "#090914", fontWeight: 400, textAlign: "left"
    },
    ForgetPasswordLinkTypo: { fontWeight: 500, paddingTop: "0.6rem", },
    requiredStyle: { display: "flex", alignItems: "center", textAlign: "start", color: "red", whiteSpace: "wrap" }

}



export const HeaderBarStyles = {
    iconColor: { color: "#6c6c6c" },
    containerBox: {
        display: "flex", flexFlow: "wrap", justifyContent: "space-between", padding: { sm: "0rem 2rem 0rem 2rem", xs: "0rem 0.5rem 0rem 0.5rem" }, background: "#FFF"
    },
    socialIconsBox: {
        display: "flex", paddingTop: "0.5rem", paddingLeft: { md: "8rem", sm: "2rem", xs: "0.5rem" }, gap: "1rem",
    },
    buttonsBox: {
        display: "flex", justifyContent: "flex-end", gap: { sm: "2rem", xs: "0rem" }
    },
    buttonStyle: {
        textTransform: "none", gap: "0.5rem", fontSize: "0.9rem", color: "#6c6c6c",
        '&:hover': {
            backgroundColor: 'transparent',
        }, '@media (max-width: 600px)': {
            '.buttonText': {
                display: 'none',
            },
        },

    },
    navbarLinksColor: {
        color: "#333E48"
    },
    navbarLinksBox: {
        display: { xs: 'none', sm: 'flex' }, justifyContent: "center", alignItems: "center", background: "#EEEEEE", gap: "2rem", padding: "0.5rem 2rem"
    },
    navbarLinksDrawerBox: {
        display: { xs: 'flex', sm: 'none' }, justifyContent: "space-between", alignItems: "center", background: "#EEEEEE", padding: "0.5rem 2rem"
    }

}


export const HeaderMainStyles = {
    containerBox: {
        padding: "1rem 0rem 1rem 0rem"
    },
    searchField: {
        '& .MuiInputBase-root.MuiOutlinedInput-root': {
            borderRadius: "5px",
            background: "#FFF",
            color: "#52525B",
            fontFamily: 'var(--font-family-secondary)',
            margin: "0.5rem 0rem 1rem 0rem",
            '& input::placeholder': {
                color: '#52525B',
                opacity: 1,
                paddingLeft: "1rem"
            },
        }
    },
    buttonsGrid: {
        flexDirection: "row", gap: { sm: "1.5rem", xs: "0.5rem" }
    },
    buttonStyle: {
        borderRadius: "5px", padding: { sm: "0.9rem 1rem", xs: "1.05rem 1rem" }, marginRight: "-0.85rem"
    },
    iconButtonStyle: {
        color: "#FFF", fontSize: { sm: "0.9rem", xs: "0.8rem" }
    },
    logoutButton: {
        borderRadius: "5px", color: "#4A4A4A", background: "#FFFFFF", padding: "0.5rem 1rem"
    },
    cartCountBox: {
        minWidth: "1rem", minHeight: "1rem", borderRadius: "50%", background: 'var(--primary-color)', fontSize: "0.65rem"
    }

}


export const FooterMainStyles = {
    iconColor: { color: "#B5B5B5" },
    containerBox: {
        background: "#101010", padding: "1rem 0rem 3rem 0rem"
    },
    firstGrid: {
        display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center',
    },
    firstGridInnerBox: {
        paddingLeft: { xl: "5rem", lg: "3rem", md: "2rem" }, display: "flex", flexDirection: "column", justifyContent: { md: 'start', sm: "center", xs: "center" }, alignItems: { md: 'start', sm: "center", xs: "center" }
    },
    firstDescription: {
        color: "#9A9EA6", width: { md: "60%", sm: "90%", xs: "90%" }, fontSize: { sm: "1rem", xs: "0.8rem" }, paddingTop: "1.5rem", textAlign: { md: "start", sm: "center", xs: "center" }
    },
    headingTypo: {
        color: 'var(--primary-color)', paddingTop: "1rem", fontWeight: 700, fontFamily: 'var(--font-family-primary)', fontSize: "1.1rem"
    },
    secondDescription: {
        width: { md: "70%", sm: "90%", xs: "90%" }, fontSize: { sm: "1rem", xs: "0.8rem" }, paddingTop: "0.5rem", textAlign: { md: "start", sm: "center", xs: "center" }
    },
    textFieldBox: {
        width: { lg: "70%", md: "80%", sm: "60%", xs: "90%" }, paddingTop: "1rem"
    },
    textFieldStyle: {
        '& .MuiInputBase-root.MuiOutlinedInput-root': {
            borderRadius: '1.875rem',
            padding: '0rem 0.375rem 0rem 1.5rem',
            background: "#F0F1F2",
            gap: '0.5rem',
            color: "#52525B",
            fontFamily: 'var(--font-family-secondary)',
            margin: "0.5rem 0rem 1rem 0rem",
            '& input::placeholder': {
                color: '#9A9EA6',
                fontSize: { sm: "1rem", xs: "0.8rem" },
                opacity: 1,
            },
        }
    },
    buttonStyle: {
        background: 'var(--primary-color)',
        textTransform: "none",
        borderRadius: '1.875rem',
        fontSize: { sm: "1rem", xs: "0.8rem" },
        padding: '0.5rem 2.375rem',
        '&:hover': {
            backgroundColor: 'var(--primary-color)',
        },

    },
    secondGridInnerBox: {
        display: "flex", gap: { xl: "10rem", lg: "8rem", md: "3rem", sm: "8rem" }, display: "flex", justifyContent: { md: 'start', sm: "center", xs: "center" }, alignItems: { md: 'start', sm: "center", xs: "center" }
    },
    listHeadingStyle: {
        color: 'var(--primary-color)', fontSize: { sm: "1rem", xs: "0.8rem" }, paddingTop: "0rem", fontWeight: 600, fontFamily: 'var(--font-family-primary)', paddingLeft: "0.9rem"
    },
    listText: {
        color: "#CFCFCF", fontSize: "0.9rem", fontFamily: 'var(--font-family-primary)', fontWeight: 400, whiteSpace: "nowrap"
    },
    lastBox: {
        display: "flex", flexDirection: { sm: "row", xs: "column-reverse" }, gap: "1rem", justifyContent: { sm: "space-between", xs: "center" }, alignItems: "center", padding: { md: "2rem 10rem 0.5rem 10rem", sm: "2rem 3rem 0.5rem 3rem", xs: "2rem 0.5rem 0.5rem 0.5rem" }
    },
    copyrightsTypo: {
        color: "#7E7F7C", fontWeight: 500, fontSize: { sm: "1rem", xs: "0.75rem" }
    },
    socialIconsBox: {
        display: "flex", gap: "1rem"
    },
    FooterAccordionSummaryStyle: {
        backgroundColor: '#F0F1F2',
    },
    FooterAccordionStyle: {
        boxShadow: "none", margin: "0rem 0.5rem 0rem 0.5rem", backgroundColor: '#F0F1F2',
    },
    FooterBarBox: {
        gap: "1rem", display: "flex", background: 'var(--primary-color)', flexFlow: "wrap", justifyContent: "space-evenly", padding: "1.2rem"
    },
    FooterBarContentBox: {
        display: "flex", gap: "1rem", alignItems: "center"
    },
    FooterBarContentTypo: {
        fontSize: "1.1rem", fontFamily: 'var(--font-family-primary)', fontWeight: 300, color: "#FFF"
    }

}



export const StatsCardStyles = {
    countBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    contup: {
        fontSize: {
            xs: "3rem",
            sm: "4rem",
        },
        display: "flex",
        fontWeight: 700,
        fontFamily: 'var(--font-family-primary)',
        color: 'var(--primary-color)',
    },
    countupBottomText: {
        fontSize: { sm: "1rem", xs: "0.75rem" },
        fontWeight: 400,
        color: "#9A9EA6",
        fontFamily: 'var(--font-family-primary)',
        textAlign: "center"
    },
    gridStyle: {
        margin: "2rem 0rem 4rem 0rem",
        display: "flex",
        flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" },
        padding: { lg: "0 5rem", md: "0 5rem", sm: "0 5rem", xs: "0 0rem" },
        gap: { xs: "4rem", sm: "7rem", md: "8rem" },
        justifyContent: "center",
        alignItems: "center",
        "@media (maxwidth: 576px)": {
            flexWrap: "wrap",
        },
    },

}


export const WhyChooseUsStyles = {
    containerBox: {
        padding: "2rem 0.5rem 3rem 0.5rem"
    },
    contentBox: {
        gap: "1.5rem", paddingBottom: "0.5rem"
    },
    WhyChooseUsTitle: {
        fontSize: { sm: "1rem", xs: "0.9" }, fontFamily: 'var(--font-family-primary)', fontWeight: 700, color: 'var(--primary-color)', textAlign: "center"
    },
    WhyChooseUsDescription: {
        fontSize: { sm: "0.9rem", xs: "0.8rem" }, fontFamily: 'var(--font-family-primary)', fontWeight: 500, color: "#333E48", textAlign: "center", width: "70%"
    }
}

export const DeliveryHoursStyles = {
    containerBox: {
        background: "#F5F5F5", padding: "1rem 0rem 1rem 0rem"
    },
    contentBox: {
        gap: "1rem", paddingBottom: "0.5rem"
    },
    DeliveryHoursTitle: {
        fontSize: "1.5rem", color: "#344955", fontWeight: 400
    },
    DeliveryHoursDescription: {
        fontSize: "1rem", color: "#344955", fontWeight: 300
    }
}


export const HappyCustomersStyles = {
    containerBox: {
        padding: "2rem 0rem 3rem 0rem",
    },
    RatingColor: {
        color: 'var(--primary-color)'
    },
    HappyCustomerName: {
        fontSize: "0.9rem", color: "#090914", fontWeight: 600, fontFamily: 'var(--font-family-secondary)',
    },
    HappyCustomerCompany: {
        fontSize: "1rem", color: "#64748B", fontWeight: 500, fontFamily: 'var(--font-family-secondary)',
    },
    HappyCustomerMsg: {
        fontSize: "0.8rem", color: "#333E48", fontWeight: 500, fontFamily: 'var(--font-family-secondary)',
    }
}


export const CategoriesCardStyles = {
    paperStyle: {
        width: 320, maxWidth: '100%',
    },
    menuListStyle: { padding: "0rem", },
    CategoriesCardTitleBox: {
        padding: "1rem 1rem", background: 'var(--primary-color)', margin: "0rem", cursor: "default", '&:hover': { backgroundColor: 'var(--primary-color)' }, pointerEvents: 'none',
    },
    CategoriesCardTitleText: {
        fontWeight: 600, color: "#FFF", fontFamily: 'var(--font-family-primary)',

    },
    listItemStyle: {
        padding: "0.5rem 1rem", display: 'flex', // Use flexbox
        justifyContent: 'space-between',
    },
    listItemText: {

        color: "#000000", fontWeight: 500, fontSize: "0.9rem", fontFamily: 'var(--font-family-primary)', textTransform: "none"
    }

}


export const ServiceCardStyles = {
    containerBox: {
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
    },
    cardBox: {
        marginTop: "1rem", padding: "1rem 0rem", gap: "1rem", marginRight: { lg: "1rem", xs: "0rem" }, borderRadius: "5px", width: { xl: "250px", lg: "200px", xs: "250px" }, height: "130px",
    },
    titleStyle: {
        color: "#000", fontWeight: 500
    },
    descriptionStyle: {
        marginTop: "1rem", color: "#333E48", fontSize: "0.9rem"
    }

}


export const ProductCardStyles = {
    cardBox: { width: "300px", height: "260px", position: "relative", cursor: "pointer" },

    heartBox: { position: "absolute", top: "1rem", left: "1rem", cursor: "pointer" },

    contentBox: { display: "flex", gap: "1rem", alignItems: "center", },

    descriptionBox: { display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" },

    iconsBox: { display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" },

    ratingBox: { display: "flex", gap: "0.3rem", alignItems: "center" },

    descriptionTypo: { fontWeight: 400, color: "#0C0C0C" },

    typoFont: { fontWeight: 500 }

}


export const ProductOnSaleStyles = {
    containerBox: {
        background: "#101010", margin: "1rem 0.5rem", borderRadius: "0.5rem", padding: "1rem 0.5rem"
    },
    typoGridStyle: {
        display: "flex", flexDirection: "column", alignItems: "start", marginTop: { lg: "2rem", xs: "1rem" }
    },
    firstHeading: {
        textAlign: "start", fontSize: "1.5rem", fontWeight: 500
    },
    secondHeading: {
        textAlign: { xl: "start", xs: "center" }, fontSize: "1.2rem", marginTop: "0.5rem"
    },
    cartBox: {
        width: "225px", height: "260px",
    }


}

export const DialogueStyles = {
    actionButtonStyle: {
        color: "#FFFFFF", textTransform: "none", fontFamily: 'var(--font-family)', fontWeight: 400, fontSize: "0.9rem",
        padding: "0.5rem 2rem", borderRadius: "0.5rem", '&:hover': { background: "#4C4848", color: "#FAF9F6" }, width: "auto"
    },
    paperPropsStyle: {
        background: "#FFF", width: "100%", maxWidth: 600, padding: "0.5rem 0.5rem 0.5rem 0.5rem"
    },
    textStyle: {
        fontFamily: 'var(--font-family-primary)', fontWeight: 600, fontSize: "0.9rem", color: "#000"
    },

    subtitleText: {
        fontFamily: 'var(--font-family-primary)', fontWeight: 400, width: "100%", fontSize: "0.9rem", color: "#000"
    },
    dialogActionsStyle: {
        display: "flex", justifyContent: 'flex-start', alignItems: "center", margin: "0rem 0rem 0rem 1rem", padding: "0.5rem 1rem"
    },
    iconBox: {
        position: 'absolute', left: 8, top: 16,
    }


}


export const HeadingBarStyles = {
    containerBox: {
        position: 'relative', width: '100%', margin: '1rem auto'
    },
    HeadingBarLine: {
        height: '0.5px', backgroundColor: '#ccc', width: '100%', position: 'relative',
    },
    HeadingBarSelectedLine: {
        height: '1.5px', backgroundColor: 'var(--primary-color)', width: { sm: '220px', xs: "135px" }, position: "absolute", bottom: 0,
    },


}

export const DisplayProductsStyles = {
    containerBox: {
        display: "flex", flexDirection: "column", padding: "1rem 2rem"
    },
    headingContainerBox: {
        display: "flex", justifyContent: "space-between", alignItems: "center",
    },
    headingBox: {
        alignItems: "center", display: "flex", gap: { sm: "8rem", xs: "3rem" }, paddingLeft: { sm: "0.7rem", xs: "0.2rem" }
    },
    headingStyle: {
        fontSize: { sm: "1.2rem", xs: "0.9rem" }, whiteSpace: "nowrap", fontWeight: 500
    },
    arrowButtonsBox: {
        display: 'flex', alignItems: 'center', gap: 2
    },
    arrowButtonStyle: {
        width: "40px", height: "40px", borderRadius: "50%", border: "0.5px solid #F0F0F0", boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.03), 0px 3px 11px 0px rgba(0, 0, 0, 0.06)', alignItems: "center", display: "flex", justifyContent: "center", cursor: "pointer"
    },
    iconStyle: {
        color: "#666666"
    },
    viewAllButton: {
        textTransform: "none", color: 'var(--primary-color)', fontSize: "1rem"
    },
    displayProductsBox: {
        display: "flex",
        flexFlow: "wrap",
        justifyContent: { sm: "start", xs: "center" },
        alignItems: "center",
    },
    dotsBox: {
        display: "flex", gap: "0.3rem", justifyContent: "center"
    },
    dotIconsStyles: {
        cursor: "pointer", width: 9,
    }

}



export const FAQsStyles = {
    containerBox: {
        border: 'none', paddingBottom: "3rem"
    },
    title: {
        color: '#1B2231', fontSize: '1.2rem', fontWeight: 600, textAlign: 'center', fontFamily: 'var(--font-family-primary)', padding: '1rem 0rem 1rem 0rem'
    },
    subtitle: {
        color: '#667085', fontFamily: 'var(--font-family-primary)', fontSize: { lg: '1rem', sm: '0.8rem', xs: '0.75rem' }, textAlign: 'center', padding: '0rem 0rem 3rem 0rem',
    },
    accordionSummaryStyle: {
        backgroundColor: '#F8FAFC',
    },
    accordionStyle: {
        border: "none", boxShadow: "none", padding: { sm: "0.5rem 0rem 0.5rem 0rem", xs: "0rem 0rem 0rem 0rem" }, backgroundColor: '#F8FAFC', borderRadius: 0
    },
    accordianSummaryTypo: {
        width: '90%', color: '#101828', fontSize: { sm: '1rem', xs: '0.8rem' },
    },
    accordianDetailsTypo: {
        color: "#667085", width: "90%"
    }

}



export const ContactFormStyles = {
    fieldBox: {
        width: { md: "500px", sm: "460px", xs: "280px" },
    },
    buttonBox: {
        display: 'flex', justifyContent: { lg: 'start', xs: "center" }
    },
    sendMessageButton: {
        borderRadius: "5px", color: "#FFF", background: "#101010", padding: "0.7rem 2.5rem",
    },
    labelStyle: {
        fontWeight: 400, color: "#121212", textAlign: "start"
    },
    formGrid: {
        justifyContent: { lg: 'end', xs: "center" }, alignItems: { lg: 'end', xs: "center" },
    },
    mapGrid: {
        justifyContent: { lg: 'start', xs: "center" }, alignItems: { lg: 'start', xs: "center" },
    }
}

export const AboutUsCardStyles = {
    containerBox: {
        display: 'flex', justifyContent: "center", alignItems: { lg: "unset", xs: "center" }, flexDirection: { lg: 'row', xs: "column" }
    },
    imgBox: {
        display: 'flex', flexDirection: 'column', width: { sm: "550px", xs: "300px" }, maxWidth: "550px"
    },
    detailsBox: {
        display: 'flex', flexDirection: 'column', width: { sm: "550px", xs: "300px" }, maxWidth: "550px", background: "#EEE", padding: { lg: "3rem 5rem 2rem 4rem", xs: "2rem 2rem 2rem 2rem" }
    },
    title: {
        fontSize: { sm: "1.5rem", xs: "1rem" }, color: "#121212"
    },
    subTitle: {
        paddingTop: "1rem", color: "#121212", fontFamily: 'var(--font-family-primary)', fontSize: { sm: "1rem", xs: "0.8rem" }
    },
    buttonBox: {
        display: 'flex', gap: "1rem", justifyContent: "start", alignItems: "center"
    },
    shopNowButton: {
        textAlign: "start", marginTop: "1rem", color: "#121212", gap: "0.3rem", fontWeight: 500, fontFamily: 'var(--font-family-primary)', borderBottom: "1px solid #121212", borderRadius: 0
    },

}


export const AboutUsMainStyles = {
    containerBox: {
        display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column'
    },
    firstTypoBox: {
        display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: { lg: "start", xs: "center" }, maxWidth: "1100px", width: { md: "90%", xs: "80%" }, padding: "3rem 0rem 2rem 0rem"
    },
    firstTypoTitle: {
        fontSize: { sm: '2rem', xs: '1.5rem' }, color: '#141718', textAlign: { lg: 'left', xs: "center" }, fontWeight: 500, letterSpacing: { sm: "-2px", xs: "0px" }, paddingBottom: "0.5rem"
    },
    secondTypoBox: {
        maxWidth: "1100px", width: { md: "90%", xs: "80%" }, paddingTop: "2.5rem"
    },
    secondTypoTitle: {
        fontSize: { sm: '1.2rem', xs: '0.95rem' }, letterSpacing: "0px"
    },
    thirdTypoBox: {
        paddingBottom: "2rem"
    },
    subTitleTypo: {
        fontFamily: "Inter", color: "#141718", fontSize: { sm: "0.95rem", xs: "0.75rem" }
    },
    listBox: {
        paddingLeft: "1.5rem", paddingTop: "2rem", listStyleType: 'disc'
    }
}



export const ServiceDetailStyles = {

    firstTypoBox: {
        display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: { lg: "start", xs: "center" }, width: { lg: "65%", md: "70%", xs: "85%" }, padding: "2rem 0rem 1rem 0rem"
    },
    headingStyle: {
        textAlign: { sm: 'left', xs: "left" }
    },
    typoBoxWidth: {
        width: { lg: "65%", md: "70%", xs: "85%" }
    },
    titlePadding: {
        paddingLeft: "2rem"
    },
    typoMargin: {
        marginBottom: "1.5rem"
    },
    iconSize: {
        fontSize: { sm: "2.1rem", xs: "1.5rem" }
    },
    iconBox: { display: "flex", justifyContent: { sm: "left", xs: "center" }, padding: "0rem 0rem 2.5rem 0rem" },
    paddingIconsValue: { paddingLeft: "0" }

}



export const BreadCrumbStyles = {

    containerBox: {
        width: { sm: "50%", xs: "100%" }, justifyContent: { sm: "center", xs: "start" }, display: "flex", padding: "1rem"
    },
    contentBox: {
        display: "flex", gap: "0.5rem", alignItems: "center"
    },
    activeTypo: {
        fontSize: { sm: "1rem", xs: "0.8rem" }, fontFamily: 'var(--font-family-primary)'
    },
    disabledColor: {
        color: "#A4A4A4",
    },

}



export const orderStatusCardStyles = {

    containerBox: { margin: "3rem 0rem 5rem 0rem" },
    backgroundStrip: { position: "absolute", top: "30%", left: 0, right: 0, bottom: 0, width: "100%", height: "200px", },
    contentBox: { zIndex: 1, width: "90%", maxWidth: "1100px", height: "530px", borderRadius: "0.5rem", gap: "1rem", padding: "2rem 0rem" },
    titleTypo: { fontSize: "1.5rem", fontWeight: 700 },
    subTitleTypo: { maxWidth: { md: "35%", sm: "60%", xs: "80%" } },
    buttonStyle: { gap: "0.5rem", padding: "0.7rem 1.5rem" },
    textStyle: { fontFamily: 'var(--font-family-primary)', fontWeight: 600, color: "#6C7275", fontSize: "0.9rem" },
    orderDetailValueColor: { color: "#141718" },
    thankyouStyle: { fontSize: "1.75rem", fontWeight: 500 },
    orderCompleteDetailContainer: { display: "flex", justifyContent: "space-between", gap: "2rem", padding: "1rem 0.5rem", minWidth: 250 },
    orderCompleteDetailBox: { display: "flex", flexDirection: "column", paddingTop: "0.5rem", gap: "1rem", }
}

export const OrderStyles = {

    orderDetailMainFirstGrid: { margin: { lg: "0rem", xs: "0rem 0.5rem" } },
    orderDetailMainSecondGrid: { display: 'flex', flexDirection: "column", justifyContent: { lg: 'start', xs: "center" }, alignItems: { lg: 'start', xs: "center" }, margin: { lg: "0rem", xs: "0rem 0.5rem" } },
    orderDetailFormTitleTypo: { textAlign: { sm: "start", xs: "center" } },
    orderDetailFormFlexBox: { display: "flex", width: "100%", gap: "1rem", },
    orderDetailFormDividerStyle: { height: "1px solid #6C7275", mt: 2.5, mb: 2.5 },
    orderDetailFormSelectField: { borderRadius: '0.5rem', border: '1px solid #E4E4E7', color: '#52525B', fontFamily: 'var(--font-family-secondary)', margin: '0.5rem 0rem 1rem 0rem', fontSize: '0.95rem', height: "2.7rem" },
    orderDetailFormFieldInputProps: { maxLength: 50, style: { padding: 8 } },
    orderDetailFormCheckboxContainerBox: { display: "flex", marginLeft: { sm: "-0.5rem", xs: "0.5rem" }, },
    orderDetailFormPaymentFieldBox: { borderRadius: '0.2rem', border: '1px solid #E4E4E7', margin: '0.5rem 0rem 1rem 0rem', padding: '0rem 1rem', display: "flex", alignItems: "center", justifyContent: "space-between", },
    orderDetailTrackStepperStack: { width: '100%', maxWidth: "30rem", paddingTop: "2rem" },
    orderDetailShippingInTypo: { color: "#7E7F7C", fontSize: "0.9rem", fontWeight: 500, fontFamily: "Inter" },
    orderDetailShippingInStepper: { padding: 0, listStyle: 'none', marginLeft: 0, mt: 4 },
    orderDetailShippingInStep: { height: 90, width: "1px solid #D4D4D4" },
    orderDetailShippingInStepIndicator: { minWidth: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    orderDetailShippingInStepLabel: { fontSize: { sm: "1.2rem", xs: "1rem" }, textAlign: "left" },
    orderDetailShippingInDivider: { height: "1px solid #D4D4D4", margin: "3rem 0rem" },
    orderDetailShippingInButtonBox: { justifyContent: { sm: 'start', xs: "center" }, mt: 2.5, },
    orderDetailShippingInButton: { background: "transparent", border: "1px solid #2F302C", color: "#2F302C", padding: { sm: "0.5rem 4rem", xs: "0.5rem 2rem" }, fontFamily: "Inter", fontWeight: 500, textTransform: "none" },
}




export const ProductDetailStyles = {
    productDetailMainFirstGrid: { display: "flex", justifyContent: { xl: "end", lg: "center", xs: "center" }, marginRight: { lg: 0, md: 0, sm: 1, xs: 0 } },
    productDetailMainSecondGrid: { display: "flex", justifyContent: { lg: "start", xs: "center" }, marginLeft: { lg: 0, md: 0, sm: 14, xs: 0 }, },
    productDetailMainThirdGrid: { display: "flex", justifyContent: { lg: "center", xs: "center" } },
    productDetailTabsContainerBox: { width: { md: '80%', xs: "100%" }, justifyContent: "center", alignItems: "center" },
    productReviewsSelectField: {
        background: "#FFF", borderRadius: "0.5rem", color: "#000", height: "2.8rem", fontSize: "0.9rem", fontFamily: 'var(--font-family-primary)',
        fontWeight: 500, border: "0.5px solid #576781", minWidth: { sm: 200, xs: 100 }
    },
    productReviewsContentContainerBox: { display: "flex", gap: "2rem", marginTop: "3rem", flexDirection: { lg: "row", xs: "column" }, justifyContent: { lg: "center", md: "center", xs: "center" }, alignItems: { lg: "unset", xs: "center" } },
    productDiscriptionPara: { maxWidth: { lg: "60%", xs: "90" }, color: "#5C5F6A", mt: 1, textAlign: "start" },
    productDiscriptionPointsBox: { paddingTop: "4rem", paddingLeft: "1.2rem", color: "#5C5F6A" },
    productDetailTableContainerBox: { marginTop: '1rem', overflowX: 'auto' },
    TableHeadings: { fontFamily: 'Inter', whiteSpace: 'nowrap', fontWeight: 600, fontSize: '0.9rem', color: '#7A7A82', },
    TableCellStyle: { fontSize: '1rem', fontWeight: 500, fontFamily: 'Inter', color: '#333E48', background: '#FDFDFD', borderBottom: '1px solid #FDFDFD', borderTop: '2px solid #FDFDFD' },
    headTableCellStyles: { borderTopLeftRadius: '0.3rem', borderBottomLeftRadius: '0.7rem', paddingLeft: '2.5rem' },
    rowTableCellBorderStyles: { borderTopLeftRadius: '0.7rem', borderBottomLeftRadius: '0.7rem', },
    productReviewFormContainerBox: { gap: "1rem", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", minWidth: { lg: 280, sm: 370, xs: 300 }, maxWidth: 400 },
    productReviewsFormSubtitleTypo: { fontSize: { sm: "0.9rem", xs: "0.75rem" }, color: "#7E7E7E", fontWeight: 400, },
    productReviewsFormFieldsMargin: { marginTop: "1rem" },
    productReviewCardContainerBox: { mt: "1rem", backgroundColor: "#F8F8F8", borderRadius: "0.7rem", padding: { sm: "1rem 8rem 1rem 6rem", xs: "1rem 0.5rem" }, width: "100%", position: "relative", display: "flex", flexDirection: "column", justifyContent: { sm: "start", xs: "center" }, alignItems: { sm: "unset", xs: "center" } },
    productReviewCardAvatarStyle: { width: 56, height: 56, position: { sm: "absolute", xs: "relative" }, top: { sm: 20, xs: "none" }, left: { sm: 10, xs: "none" }, },
    productReviewCardTitleBox: { display: "flex", justifyContent: "space-between", marginTop: { sm: "0rem", xs: "1rem" }, gap: "1rem" },
    productReviewCardMsgTypo: { fontSize: { sm: "0.95rem", xs: "0.75rem" }, color: "#7E7E7E", fontWeight: 400, mt: 1 },





}




export const MyAccountStyles = {

    sidebar: {
        position: { lg: "sticky", md: "sticky", sm: "normal", xs: "normal" },
        top: 0,
        left: 0,
        width: "2.2rem",
        height: "100vh",
        overflowY: "auto",
        height: {
            lg: "calc(100vh - 64px)", md: "calc(100vh - 64px)", sm: "100%"
        }
    },
    sideBarOuterBox: {
        display: "flex",
        position: { md: "absolute", xs: "relative" },
        top: { md: "10%", xs: 0 },
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "1.5rem 2rem 1rem 2rem",
    },
    sideBarSelectButton: {
        display: "flex", gap: "1rem", padding: "0.5rem 1.5rem", color: "#0E1422", marginTop: "0.5rem", width: "100%",
        justifyContent: { md: "flex-start", sm: "center", xs: "flex-start" }, alignItems: { md: "flex-start", sm: "center", xs: "flex-start" }, textTransform: "none",
        fontFamily: 'Inter', fontWeight: 500, height: "100%", "&:hover": { background: "#F6F6F6" },
    },
    sideBarContentBox: {
        width: "100%", display: "flex", flexDirection: { lg: "column", md: "column", sm: "row", xs: "column" }
    },
    sideBarDividerStyle: {
        alignSelf: { lg: "stretch", sm: "flex-start", xs: "stretch" }, display: { md: "flex", xs: "none" }, marginLeft: { sm: "1rem", xs: 0 }, height: "40vh", border: "1px solid #E9E9EB"
    },
    containerBox: {
        gap: "2rem", display: "flex", flexDirection: "column", padding: "3rem 1rem 2rem 1rem"
    },
    headingTypo: {
        textAlign: { md: "start", xs: "center" }, fontSize: "1rem"
    },
    contentBox: {
        flexDirection: { lg: "row", xs: "column" }, justifyContent: { md: 'space-between', xs: "center" }, alignItems: { lg: "center", md: 'start', xs: "center" }, maxWidth: { lg: 900, xs: "100%" }, gap: "1rem"
    },
    firstBox: {
        display: "flex", flexDirection: { sm: "row", xs: "column" }, alignItems: "center", gap: "1rem"
    },
    typoBox: {
        gap: "0.2rem", display: "flex", flexDirection: "column", alignItems: { sm: "start", xs: "center" }
    },
    typoFontSize: {
        fontSize: "0.8rem"
    },
    secondBoxWishlist: {
        display: "flex", flexDirection: { sm: "row", xs: "row" }, alignItems: "center", gap: { sm: "2rem", xs: "1rem" }
    },
    secondBoxOrderHistory: {
        flexDirection: { sm: "row", xs: "column" },
    },
    orderPriceTypo: {
        fontFamily: 'var(--font-family-primary)', fontWeight: 500, color: "#0E1422"
    },
    buttonBox: {
        justifyContent: { md: 'start', xs: "center" }
    },
    viewItemButton: {
        border: "1px solid #0E1422", background: "transparent", color: "#0E1422"
    },
    changePasswordFormBox: {
        justifyContent: { md: 'start', xs: "center" }, alignItems: { md: 'start', xs: "center" }
    },
    emptyHistoryContainerBox: {
        display: "flex", justifyContent: { md: "center", xs: "center" }, alignItems: "center", padding: { md: "10rem 10rem 2rem 1rem", xs: "2rem" }
    },
    emptyHistoryImageBox: {
        border: "5px solid #545454", borderRadius: "50%", padding: "2rem"
    },
    emptyHistorySubtitle: {
        fontFamily: 'var(--font-family-primary)', color: "#5C5F6A", fontSize: { sm: "1rem", xs: "0.8rem" }
    }

}


export const ShopStyles = {

    mainFirstGrid: { display: "flex", justifyContent: "center", },
    mainSecondGrid: { display: "flex", justifyContent: { lg: "start", xs: "center" } },
    mainThirdGrid: { display: "flex", flexDirection: "column", justifyContent: { lg: "start", xs: "center" } },
    shopCategoriesContainerBox: { display: "flex", flexFlow: "wrap", justifyContent: "center", alignItems: "center", gap: "2rem", padding: "1rem" },
    shopCategoriesContentBox: { padding: "1rem 0rem", cursor: "pointer" },
    shopCategoriesTypo: { fontFamily: 'var(--font-family-primary)', fontSize: "0.9rem", paddingTop: "1.5rem" },
    shopFilterOptionTypo: { fontSize: "0.9rem", fontWeight: 600 },
    filterSideBarContainerBox: { padding: "1rem 1rem 1rem 2rem", width: 320, display: "flex", flexDirection: "column", gap: "1rem" },
    filterSideBarButtonBox: { display: "flex", gap: "0.5rem", pt: 1 },
    filterSideBarSliderContainer: { width: 270, p: "0 0.5rem" },
    filterSideBarPriceRangeButton: { border: "none", background: "#F6F6F6", color: "#0E1422", padding: "auto", borderRadius: 0, boxShadow: "none", width: 200 },
    filterSideBarApplyButton: { padding: "0rem 1.4rem", borderRadius: 0 },
    filterChipsBox: { display: "flex", flexFlow: "wrap", gap: "1rem", paddingLeft: "1rem", mt: 1 },
    filterTopBarContainerBox: { display: "flex", flexDirection: { sm: "row", xs: "column" }, justifyContent: "space-between", p: "0 1rem", maxWidth: 1200 },
    filterTopBarButtonBox: { display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", pt: 1 },
    filterTopBarSelect: { minWidth: 160, height: "2rem", borderRadius: "0.4rem", border: "1px solid #DDE2E4" },
    filterTopBarSelectSpanTypo: { color: '#9AA6AC', fontSize: "0.9rem", },
    filterTopBarIconBox: { padding: "0rem 0.5rem", background: "#DDE2E4", border: "1px solid #E8ECEF", borderRadius: "0.5rem", alignItems: "center", justifyContent: "center", display: "flex", cursor: "pointer" }

}

