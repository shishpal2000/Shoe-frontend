import EditInfo from "./edit-my-info";

export const metadata = {
  title: "Shoe | Edit My Info",
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
      <EditInfo />
    </>
  );
};

export default page;
