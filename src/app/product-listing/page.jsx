import ProductListing from "./productListing";

export const metadata = {
  title: "Product Listing",
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
      <ProductListing />
    </>
  );
};

export default page;
