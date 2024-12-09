import Logo from "@/components/ui/Header/Logo";
import { useAuth } from "../_store/AuthContext"; // Import useAuth
import Link from "next/link";

export default function LoginHeader() {
  const { setSignUp } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <Link href="/">
        <Logo textColor="text-black" />
      </Link>
      <h4 className="mt-2 text-h4 font-semibold">Đăng nhập</h4>
      <div className="text-center text-[12px]">
        <p>hoặc</p>
        <button
          className="text-gray-400 underline"
          onClick={() => setSignUp(true)} // Set SignUp to true when clicked
        >
          tạo tài khoản mới
        </button>
      </div>
    </div>
  );
}
