import Cancellation from "./cancellation";

export const metadata = {
  title: "Shoe | Cancellation",
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
      <Cancellation />
    </>
  );
};

export default page;
