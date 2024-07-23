import MyInfo from "./my-info";

export const metadata = {
  title: "Shoe | My Info",
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
      <MyInfo />
    </>
  );
};

export default page;
