import Logo from "@/components/ui/Header/Logo";
import { useAuth } from "../_store/AuthContext";

export default function VerifyHeader() {
  const { setVerifying, setSignUp } = useAuth();

  const handleGoBack = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(false);
    setSignUp(true);
  };

  return (
    <div className="flex flex-col items-center">
      <Logo textColor="text-black" />
      <h4 className="mt-2 text-h3 font-semibold">Xác minh tài khoản</h4>
      <div className="text-center text-[12px]">
        <button onClick={handleGoBack} className="text-gray-400 underline">
          quay lại đăng ký
        </button>
      </div>
    </div>
  );
}
