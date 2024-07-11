import SignUp from "./signUp";

export const metadata = {
  title: "Sign Up",
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
