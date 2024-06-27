import Categories from "@/components/homePage/Categories/Categories";
import Header from "@/components/Header/Header";
import BestSellingProducts from "@/components/homePage/BestSellingProducts/BestSellingProducts";

import HeroSection from "@/components/homePage/HeroSection/HeroSection";
import HomeGallery from "@/components/homePage/HomeGallery/HomeGallery";
import PopularProducts from "@/components/homePage/PopularProducts/PopularProducts";
import ShoeCollection from "@/components/homePage/ShoeCollection/ShoeCollection";

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
    </>
  );
};

export default HomePage;
