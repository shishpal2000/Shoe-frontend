import PrivacyPolicy from "./privacyPolicy";

export const metadata = {
  title: "Shoe | Privacy & Policy",
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
      <PrivacyPolicy />
    </>
  );
};

export default page;
