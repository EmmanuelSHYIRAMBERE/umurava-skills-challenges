export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  verified: boolean;
  role: "user" | "admin";
  otp: string | null;
  otpexpire: Date | null;
}
