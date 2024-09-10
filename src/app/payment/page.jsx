

import PaymentPage from "./payment";

export const metadata = {
  title: "Shoe | Payments",
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
      <PaymentPage />
    </>
  );
};

export default page;
