import VerifyCode from "./verify-code";

export const metadata = {
  title: "Shoe | Verify Code",
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
      <VerifyCode />
    </>
  );
};

export default page;
