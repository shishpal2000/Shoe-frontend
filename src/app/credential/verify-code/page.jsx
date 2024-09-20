import VerifyCode from "./verify-code";
import { Suspense } from "react";

const Loading = () => <div>Loading payment details...</div>;

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
      <Suspense fallback={<Loading />}>
        <VerifyCode />
      </Suspense >
    </>
  );
};

export default page;
