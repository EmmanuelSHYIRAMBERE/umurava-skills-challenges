import Login from "@/components/Login";
import { Metadata } from "next";

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "LOGIN - UMURAVA",
  description: "Enter your credentials to enter your dashboard",
};
