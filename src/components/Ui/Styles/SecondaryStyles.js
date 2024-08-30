"use client";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export const styles = {
  section1: {
    padding: "50px 40px 5px 5px",
  },
  section2: {
    padding: "2rem 40px 2rem 40px",
  },
  bold: {
    fontWeight: "bold",
    textAlign: "start",
  },
  boxin: {
    display: "flex",

    justifyContent: "space-between",
    paddingTop: "2rem",
    alignItems: "center",
  },
  boxin2: {
    display: "flex",
    borderBottom: "1px solid grey",
    justifyContent: { sm: "space-between", xs: "space-evenly" },
    alignItems: "flex-start",
  },
  qtyBox: {
    border: "0.5px solid #D9D9D9"
  },
  addremoveButton: {
    color: "#000"
  },
  qty: {
    padding: "0.5rem 1rem",
  },
  cat: {
    fontSize: "small",
  },
  pd: {
    padding: "0.5rem 0rem",
  },
  pd2: {
    padding: 2,
  },
  box2: {
    display: "flex",
    paddingTop: "8px",
  },
  box3: {
    display: "flex",
    paddingTop: "12px",
  },
  imgsty: {
    flexShrink: 0,
    width: "80px",
    height: "auto",
  },
  imgsty2: {
    flexShrink: 0,
    width: "80px",
    height: "auto",
  },
  pr: {
    paddingLeft: "0px",
  },
  box1: {
    maxWidth: 50,
  },
  bx1: {
    maxWidth: "100%",
  },
  fontsty: {
    fontSize: {
      lg: 15,
      md: 15,
      sm: 12,
      xs: 12,
    },
  },
  cancel: {
    marginLeft: "0.5rem",
    cursor: "pointer",
  },
  main: {
    padding: "50px",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "0.5rem",
    padding: 10,
  },
  centbtn: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingTop: "20px",
  },
  boldfont2: {
    fontWeight: "bold",
    fontSize: 15,
  },

  colsptxt: {
    paddingTop: "1rem",
    fontSize: "small",
  },
  btn: {
    backgroundColor: "black",
    width: {
      lg: 300,
      md: 300,
      sm: "100%",
      xs: "100%",
    },
    textTransform: "none",
    marginTop: 5,
  },
  apbtn: {
    backgroundColor: "white",
    border: "1px solid grey",
    color: "black",
    textTransform: "none",
  },
  btncont: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  txtfld: {
    width: {
      lg: 320,
      md: 320,
      sm: "100%",
      xs: "100%",
    },
    minWidth: 220,
    paddingTop: "0.3rem",
  },
  estmtxt: {
    color: "grey",
    fontSize: 15,
  },
  boldblue: {
    fontWeight: "bold",
    fontSize: 15,
    color: "dodgerblue",
  },
  udtxt: {
    textDecoration: "underline",
    cursor: "pointer",
    fontFamily: "Inter",
    fontWeight: 500, fontSize: "0.9rem"
  },
  tempsty: {
    padding: "20px",
  },
  productDetailsActionBtnsContainerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: { lg: "left", xs: "center" },
    paddingLeft: { lg: 0, xs: 2 },
    width: "100%"
  },
  productDetailsActionBtnsIconsBox: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "60%",
    gap: "1.5rem",
  },
  productDetailsActionBtnsDividerStyle: {
    height: "1px solid #E8ECEF",
    paddingTop: "1rem",
    width: "100%",
    maxWidth: "500px",
  },
  productDetailsPrimaryImg: {
    height: 350, width: 360, background: "#F1F2F4", justifyContent: "center", padding: "3rem", alignItems: "center"
  },
  productDetailsSecondaryImagesBoxContainer: { display: "flex", gap: { sm: "0.7rem", xs: "0.5rem" } },
  productDetailsSecondaryImagesBox: { background: "#F1F2F4", padding: "0.7rem", },
  productDetailsSecondaryImages: { width: "70px" },
  ordr1: {
    padding: {
      xs: "20px 0px 5px 0px",
      sm: "20px 0px 5px 0px",
      md: "80px 0px 5px 10rem",
    },
    maxWidth: {
      md: "100%",
      xs: "100%",
      sm: "85%",
    },
  },
  ordr2: {
    maxWidth: 500,
  },
  ordr3: {
    display: "flex",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "flex-start",
  },
  ordrrw: {
    fontSize: 13,
    color: "grey",
    paddingTop: "5px",
    fontWeight: "bold",
  },
  ordrmr: {
    marginLeft: "50px",
    fontSize: "14px",
  },
  ordrbtn: {
    width: { lg: 335, xs: 250 },
    backgroundColor: "black",
    color: "white",
    textTransform: "none",
  },
  ordrpd: {
    padding: "10px 0px 10px 0px",
  },
  prnm: {
    paddingTop: 3,
    fontSize: 20,
    maxWidth: "80%",
    fontWeight: "bold",
  },
  ordrfl: {
    paddingTop: "10px",
    gap: "0.3rem",
    display: "flex",
  },
  ordricn: {
    color: "#2E838F",
    fontSize: "sm",
  },
  ordrfnt: {
    color: "grey",
    whiteSpace: "nowrap",
    fontSize: { lg: 14, xs: 12 },
  },
  imgbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: {
      xs: "50px 0px 0px 10px",
      sm: "40px 0px 0px 10px",
      md: "40px 0px 0px 0px",
      lg: "40px 0px 0px 50px",
    },

    width: 200,
  },
  rwjs: {
    justifyContent: "space-between",
  },
  rwpd: {
    padding: "15px",
  },
  frmcnt: {
    m: 1,
    minWidth: 120,
  },

  paperStyle: {
    marginLeft: { lg: "5rem", xs: "0rem" }, marginTop: { lg: "0rem", xs: "2rem" }
  },
  shopCartDividerStyles: {
    height: "0.5px solid #A3A3A3", paddingTop: "0.7rem"
  },
  orderTrackSummaryCardPaper: { marginLeft: { lg: "5rem", xs: "0rem" }, marginTop: { lg: "3rem", xs: "2rem" }, width: "100%", maxWidth: { sm: 450, xs: "100%" } },
  orderTrackSummaryCardTitle: { textAlign: { lg: "start", xs: "center" }, fontSize: "1.2rem", fontFamily: "Inter", fontWeight: 600 },
  orderTrackSummaryCardSubtitle: { textAlign: { lg: "start", xs: "center" }, color: "#7E7F7C", fontSize: "0.8rem" },
  orderTrackSummaryCardPrductTypoBox: { gap: "0.2rem", display: "flex", flexDirection: "column", alignItems: { sm: "start", xs: "center" } },
  orderTrackSummaryCardDivider: { height: "1px solid #D4D4D4", margin: "1rem 0rem" },
  orderTrackSummaryCardTotalItems: { color: "#7E7F7C", fontSize: "0.8rem" },

  emptyShppingCartContainerBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: "3.5rem", paddingTop: { lg: "2rem", xs: "1.5rem" } },
  emprtyShoppingCartSubtitleTypo: { fontSize: { sm: "1.5rem", xs: "1.1rem" }, textAlign: "center", maxWidth: 300 },
};



export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 4,
}));


export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg, #2F302C 0%, #2F302C 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg, #2F302C 0%, #2F302C 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));


export const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: ownerState.isLastStep
      ? 'linear-gradient(136deg, #EF7E64 0%, #EF7E64 100%)' // Red gradient for the last step
      : 'linear-gradient(136deg, #2F302C 0%, #2F302C 100%)', // Default gradient for other steps
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, #2F302C 0%, #2F302C 100%)',
  }),
}));