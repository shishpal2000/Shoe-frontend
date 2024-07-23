import MyOrder from "./my-order";

export const metadata = {
  title: "Shoe | My Order",
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
      <MyOrder />
    </>
  );
};

export default page;
