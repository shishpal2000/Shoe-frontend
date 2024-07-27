import AboutUs from "./about-us";

export const metadata = {
  title: "Shoe | About Us",
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
      <AboutUs />
    </>
  );
};

export default page;
