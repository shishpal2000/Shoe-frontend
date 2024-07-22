import SignUp from "./signUp";

export const metadata = {
  title: "Shoe | Sign Up",
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
      <SignUp />
    </>
  );
};

export default page;
