import Categories from "@/components/homePage/Categories/Categories";
import Header from "@/components/Header/Header";
import BestSellingProducts from "@/components/homePage/BestSellingProducts/BestSellingProducts";

import HeroSection from "@/components/homePage/HeroSection/HeroSection";
import HomeGallery from "@/components/homePage/HomeGallery/HomeGallery";
import PopularProducts from "@/components/homePage/PopularProducts/PopularProducts";
import ShoeCollection from "@/components/homePage/ShoeCollection/ShoeCollection";
import { WeOffer } from "@/components/homePage/WeOffer/WeOffer";
import Testimonial from "@/components/homePage/Testimonial/Testimonial";
import Footer from "@/components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Categories />
      <HomeGallery />
      <PopularProducts />
      <ShoeCollection />
      <BestSellingProducts />
      <WeOffer />
      <Testimonial />
      <Footer />
    </>
  );
};

export default HomePage;
