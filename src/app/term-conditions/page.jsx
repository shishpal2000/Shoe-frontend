import TermConditions from "./termConditions";

export const metadata = {
  title: "Shoe | Term & Conditions",
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
      <TermConditions />
    </>
  );
};

export default page;
