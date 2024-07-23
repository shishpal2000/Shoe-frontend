import MyOrders from "./my-order";

export const metadata = {
  title: "Shoe | My Orders",
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
      <MyOrders />
    </>
  );
};

export default page;
