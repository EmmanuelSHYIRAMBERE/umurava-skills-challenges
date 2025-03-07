"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import usePost from "@/hooks/use-post";
import { useToast } from "@/hooks/use-toast";
import { IUser } from "@/types";
import OTPInput from "@/components/OTPInput";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [otp, setOtp] = React.useState("");
  const [isResending, setIsResending] = React.useState(false);
  const { add, isAdding } = usePost("/api/otp-verification");

  // Check for user data on component mount
  React.useEffect(() => {
    // Get user from localStorage with proper type checking
    const userString =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const user: IUser | null = userString ? JSON.parse(userString) : null;

    // If no user or no user role, redirect to login
    if (!user || !user.email) {
      router.push("/login");
    }
  }, [router]);

  // Get user data for rendering
  const userEmail = localStorage.getItem("userEmail");
  const getUserData = () => {
    if (typeof window === "undefined") return null;
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  };

  const userData = getUserData();

  const handleOtpChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await add({ otp });

      toast({
        title: "Success",
        description: "Successfully account verified! Redirecting...",
      });

      router.push("/login");
    } catch (error) {
      console.log("Error verifying email", error);
      toast({
        title: "Error",
        description: "Failed to verify email.",
      });
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);

    if (!userData && userEmail) {
      toast({
        title: "Error",
        description: "User data is missing. Please log in again.",
      });
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`/api/user/resendToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userData.email || userEmail }),
      });

      // Check if response has content before trying to parse JSON
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Handle non-JSON response
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to resend verification email"
        );
      }

      toast({
        title: "Success",
        description: "Email sent successfully!",
      });
      setOtp("");
    } catch (err) {
      console.log("Error resending email", err);
      toast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to resend verification email",
      });
    } finally {
      setIsResending(false);
    }
  };

  // Show loading state or return null while checking user data
  if (!userData) {
    return null;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-blue-600 p-4">
      <div className="text-white text-left mr-10 hidden md:block">
        <h1 className="text-3xl font-bold">UMURAVA</h1>
        <p className="text-lg">OTP Verification</p>
      </div>
      <Card className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <CardContent className="flex flex-col items-center space-y-6">
          {/* Rest of your JSX remains the same */}
          <div className="bg-blue-100 p-3 rounded-full">
            <ShieldCheck className="text-blue-600 w-10 h-10" />
          </div>
          <p className="text-gray-700 text-lg font-medium">Enter OTP Code</p>
          <p className="text-gray-500 text-sm">
            We have sent an OTP to your email address{" "}
            <span className="font-semibold">{userData.email}</span>. Please
            check your inbox.
          </p>
          <div className="flex space-x-3">
            <OTPInput length={6} value={otp} onChange={handleOtpChange} />
          </div>
          <Button
            className="w-full flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
            onClick={handleSubmit}
            disabled={isAdding}
          >
            {isAdding && <span className="animate-spin mr-2">🔄</span>}
            {isAdding ? "Verifying..." : "Verify OTP"}
          </Button>
          <Button
            className="w-full flex items-center justify-center gap-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg mt-2"
            onClick={handleResendEmail}
            disabled={isResending}
          >
            {isResending && <span className="animate-spin mr-2">🔄</span>}
            {isResending ? "Resending..." : "Resend Token"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
