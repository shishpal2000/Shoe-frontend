import LogIn from "./logIn";

export const metadata = {
  title: "Log In",
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
      <LogIn />
    </>
  );
};

export default page;
