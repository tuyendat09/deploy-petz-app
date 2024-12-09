import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isSignUp: boolean;
  setSignUp: (value: boolean) => void;
  verifying: boolean;
  setVerifying: (value: boolean) => void;
  email: string;
  setEmail: (value: string) => void;
  modalText: string;
  setModalText: (value: string) => void;
  modalDisplay: boolean;
  setModalDisplay: (value: boolean) => void;
  forgotPassword: boolean;
  setForgotPassword: (value: boolean) => void;
  verifyChangePassword: boolean;
  setVerifyChangePasword: (value: boolean) => void;
  isReset: boolean;
  setIsReset: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignUp, setSignUp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [verifyChangePassword, setVerifyChangePasword] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const [email, setEmail] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalDisplay, setModalDisplay] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isSignUp,
        setSignUp,
        verifying,
        setVerifying,
        email,
        setEmail,
        modalText,
        setModalText,
        modalDisplay,
        setModalDisplay,
        forgotPassword,
        setForgotPassword,
        verifyChangePassword,
        setVerifyChangePasword,
        isReset,
        setIsReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
