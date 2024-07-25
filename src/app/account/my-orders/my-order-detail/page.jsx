import OrderTrackDetail from "./my-order-detail";

export const metadata = {
  title: "Shoe | My Orders Details",
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
      <OrderTrackDetail />
    </>
  );
};

export default page;
