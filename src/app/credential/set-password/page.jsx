import SetPassword from "./set-password";

export const metadata = {
  title: "Set Password",
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
      <SetPassword />
    </>
  );
};

export default page;
