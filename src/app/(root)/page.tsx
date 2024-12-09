import HeroSection from "@/components/pages/Home/HeroSection/HeroSection";
import Categories from "@/components/pages/Home/Categories/Categories";
import SaleSection from "@/components/pages/Home/SaleSection/SaleSection";
import FeedbackSection from "@/components/pages/Home/FeedbackSection/FeedbackSection";
import React from "react";
import AboutUs from "@/components/pages/Home/AboutUs/AbousUs";
import WhyChooseUs from "@/components/pages/Home/WhyChoseUs/WhyChooseUs";
import ServicesSection from "@/components/pages/Home/NewServiceSection/ServicesSection";
import RecallBooking from "@/components/pages/Home/RecallBooking/RecallBooking";
export default function page() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <WhyChooseUs />
      <ServicesSection />
      <FeedbackSection />
      <Categories />
      <SaleSection />
      <RecallBooking />
    </>
  );
}
