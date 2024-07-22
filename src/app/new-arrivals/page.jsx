import NewArrivals from "./newArrivals";

export const metadata = {
  title: "Shoe | New Arrivals",
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
      <NewArrivals />
    </>
  );
};

export default page;
