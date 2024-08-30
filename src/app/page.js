"use client"
import CategoriesCard from "@/components/HomeComponents/CategoriesCard/CategoriesCard";
import DeliveryHours from "@/components/HomeComponents/DeliveryHours/DeliveryHours";
import DisplayProducts from "@/components/HomeComponents/DisplayProducts/DisplayProducts";
import HappyCustomers from "@/components/HomeComponents/HappyCustomers/HappyCustomers";

import ProductOnSale from "@/components/HomeComponents/ProductOnSale/ProductOnSale";
import ServiceCard from "@/components/HomeComponents/ServiceCard/ServiceCard";
import StatsCard from "@/components/HomeComponents/StatsCard/StatsCard";
import WhyChooseUs from "@/components/HomeComponents/WhyChooseUs/WhyChooseUs";
import FooterBar from "@/components/LayoutComponents/Footer/FooterBar/FooterBar";
import FooterMain from "@/components/LayoutComponents/Footer/FooterMain/FooterMain";
import HeaderBar from "@/components/LayoutComponents/Header/HeaderBar/HeaderBar";
import HeaderMain from "@/components/LayoutComponents/Header/HeaderMain/HeaderMain";
import NavBar from "@/components/LayoutComponents/Header/Navbar/Navbar";



import { Grid } from "@mui/material";
import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";


export default function Home() {
  const queryClient = new QueryClient();

  return (
    <>
      <HeaderBar />
      <HeaderMain />
      <NavBar />

      <Grid container spacing={1} >
        <Grid item xs={12} sm={12} md={12} lg={2.8} xl={2.5}  >
          <CategoriesCard />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={7.2} xl={7.5}>
          <ProductOnSale />
          <DisplayProducts heading={"New Products"} />
          <DisplayProducts heading={"Most Popular"} />
          <DisplayProducts heading={"Trending Products"} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
          <ServiceCard />
        </Grid>
      </Grid>

      <DeliveryHours />
      <HappyCustomers />
      <WhyChooseUs />
      <StatsCard />

      <FooterBar />
      <FooterMain />

    </>
  );
}
