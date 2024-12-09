import Logo from "@/components/ui/Header/Logo";
import { useAuth } from "../_store/AuthContext"; // Import useAuth

export default function SignUpHeader() {
  const { setSignUp } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <Logo textColor="text-black" />
      <h4 className="mt-2 text-h3 font-semibold">Đăng ký</h4>
      <div className="text-center text-[12px]">
        <button
          className="text-gray-400 underline"
          onClick={() => setSignUp(false)} // Set SignUp to true when clicked
        >
          về đăng nhập
        </button>
      </div>
    </div>
  );
}
