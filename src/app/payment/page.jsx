import { Suspense } from 'react';
import PaymentPage from "./payment";

const Loading = () => <div>Loading payment details...</div>;

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
      <Suspense fallback={<Loading />}>
        <PaymentPage />
      </Suspense>
  );
};

export default page;
