import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";

const OTPInput = ({
  length = 6,
  value = "",
  onChange = ( string) => {},
}) => {
  const [otp, setOtp] = useState(value.padEnd(length, ""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = otp.split("");
    newOtp[index] = value.slice(-1);
    const newOtpString = newOtp.join("");

    setOtp(newOtpString);
    onChange(newOtpString);

    if (value && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedNumbers = pastedData.replace(/\D/g, "").slice(0, length);

    if (pastedNumbers) {
      const newOtp = pastedNumbers.padEnd(length, "");
      setOtp(newOtp);
      onChange(newOtp);
      focusInput(Math.min(pastedNumbers.length, length - 1));
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-semibold"
        />
      ))}
    </div>
  );
};

export default OTPInput;
