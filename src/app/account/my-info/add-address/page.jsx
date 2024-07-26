import AddAddress from "./add-address";

export const metadata = {
  title: "Shoe | My Info Add Address",
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
      <AddAddress />
    </>
  );
};

export default page;
