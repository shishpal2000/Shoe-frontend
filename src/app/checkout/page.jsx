import Checkout from "./checkout";

export const metadata = {
  title: "Shoe | Checkout",
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
      <Checkout />
    </>
  );
};

export default page;
