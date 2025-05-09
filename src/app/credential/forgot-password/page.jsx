import ForgotPassword from "./forgot-password";

export const metadata = {
  title: "Forgot Password",
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
      <ForgotPassword />
    </>
  );
};

export default page;
