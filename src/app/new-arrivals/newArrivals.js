import BestSellingProducts from "@/components/homePage/BestSellingProducts/BestSellingProducts";
import InnerBanner from "@/components/InnerPageBanner/InnerBanner";

const NewArrivals = () => {
  return (
    <>
      <InnerBanner
        tag="Limited time only"
        heading="Get 30% off"
        bgImg="/newArrivalBg.png"
        descrip={`Shoes made with your comfort in mind so you can put all of your \n focus into your next session.`}
      />

      <BestSellingProducts />
    </>
  );
};

export default NewArrivals;
