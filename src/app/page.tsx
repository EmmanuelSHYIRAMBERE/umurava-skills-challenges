import Home from "@/components/Home";
import { Metadata } from "next";

const HomePage = () => {
  return <Home />;
};

export default HomePage;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "",
  description: "",
};
