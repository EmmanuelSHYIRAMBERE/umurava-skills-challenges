import { Metadata } from "next";

const page = () => {
  return <div>page</div>;
};

export default page;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "",
  description: "",
};
