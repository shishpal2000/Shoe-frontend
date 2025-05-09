import Shipping from "./shipping";

export const metadata = {
  title: "Shoe | Shipping",
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
      <Shipping />
    </>
  );
};

export default page;
