import ShoeDetails from "./shoe-details";

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
      <ShoeDetails />
    </>
  );
};

export default page;
