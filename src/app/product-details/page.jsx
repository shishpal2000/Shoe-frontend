import ProductDetails from "./products-details";

export const metadata = {
  title: "Shoe Details",
  description: "",
  alternates: {
    canonical: "abc",
    languages: {
      "en-US": "English",
    },
  },
};
const page = () => {
  return (
    <>
      <ProductDetails />
    </>
  );
};

export default page;
