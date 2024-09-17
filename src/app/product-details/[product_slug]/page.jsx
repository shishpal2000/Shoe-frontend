import ProductDetails from "../products-details";

import style from "@/styles/productDetail.module.css";
import Collection from "@/components/homePage/ShoeCollection/Collection";

export const metadata = {
  title: "Shoe | Shoe Details",
  description: "",
  alternates: {
    canonical: "abc",
    languages: {
      "en-US": "English",
    },
  },
};
const page = ({ params }) => {
  const { product_slug } = params;

  return (
    <>
      <ProductDetails slug={product_slug} />

      <div className={style.relatedProducts}>
        <div className="container">
          <h4>Related Products</h4>
          <Collection />
        </div>
      </div>
    </>
  );
};

export default page;
