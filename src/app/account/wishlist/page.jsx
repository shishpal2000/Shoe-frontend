import Wishlist from "./wishlist";

export const metadata = {
  title: "Shoe | Wishlist",
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
      <Wishlist />
    </>
  );
};

export default page;
