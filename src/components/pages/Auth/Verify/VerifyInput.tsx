import { useRef } from "react";

interface OTPInputProps {
  otp: Array<number | undefined>;
  setOtp: (otp: Array<number | undefined>) => void;
}

export default function OTPInput({ otp, setOtp }: OTPInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = Number(value);
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = undefined;
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");

    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("").map(Number);
      setOtp(newOtp);

      newOtp.forEach((digit, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = String(digit);
        }
      });

      // Tự động focus vào ô cuối cùng khi đã dán mã
      inputRefs.current[newOtp.length - 1]?.focus();
    }
  };

  return (
    <div className="mx-auto mt-2 w-fit space-x-2">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          className="border-gray-400 bg-gray-50 focus-within:outline-gray-400 h-12 w-12 rounded-lg border text-center drop-shadow-sm"
          value={value !== undefined ? value : ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => index === 0 && handlePaste(e)} // Chỉ cho phép dán từ ô đầu tiên
          maxLength={1} // Giới hạn 1 ký tự
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
}
