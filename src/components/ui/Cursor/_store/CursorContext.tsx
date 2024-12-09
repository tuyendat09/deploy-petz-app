import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, {
  createContext,
  useContext,
  ReactNode,
  useRef,
  useState,
} from "react";

interface CursorContextProps {
  circleSize: number;
  handleMouseEnterLink: () => void;
  handleMouseLeaveLink: () => void;
  iconRef: any;
  circle: any;
  mouse: any;
  delayMouse: any;
  textRef: any;
  buttonText: string;
  handleMouseEnterActionButton: (text: string) => void;
  handleMouseLeaveActionButton: () => void;
  handleMouseLeaveButton: () => void;
  handleMouseEnterButton: (
    buttonRef: React.RefObject<HTMLButtonElement>,
  ) => void;
}

const CursorContext = createContext<CursorContextProps | undefined>(undefined);

interface CursorProviderProps {
  children: ReactNode;
}

export const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
  const circleSize = 20;
  const circle = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const delayMouse = useRef({ x: 0, y: 0 });
  const [buttonText, setButtonText] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  const { contextSafe } = useGSAP();

  const handleMouseEnterLink = contextSafe(() => {
    gsap.to(circle.current, { width: 40, height: 40 });
    gsap.to(iconRef.current, {
      opacity: 1,
      width: 22,
      height: 22,
      display: "block",
    });
  });

  const handleMouseLeaveLink = contextSafe(() => {
    gsap.to(circle.current, { width: circleSize, height: circleSize });
    gsap.to(iconRef.current, {
      opacity: 0,
      width: 16,
      height: 16,
      display: "none",
    });
  });

  const handleMouseEnterActionButton = contextSafe((text: string) => {
    setButtonText(text);
    gsap.to(circle.current, { width: 40, height: 40 });
    gsap.to(textRef.current, { opacity: 1, y: 0, display: "block" });
  });

  const handleMouseLeaveActionButton = contextSafe(() => {
    setButtonText("");

    gsap.to(circle.current, { width: circleSize, height: circleSize });
    gsap.to(textRef.current, { opacity: 0, y: 12, display: "none" });
  });

  const handleMouseEnterButton = contextSafe(
    (buttonRef: React.RefObject<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();

        gsap.to(circle.current, {
          width: rect.width + 20,
          height: rect.height + 20,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
  );

  const handleMouseLeaveButton = contextSafe(() => {
    gsap.to(circle.current, {
      width: circleSize,
      height: circleSize,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  return (
    <CursorContext.Provider
      value={{
        circleSize,
        iconRef,
        handleMouseEnterLink,
        handleMouseLeaveLink,
        handleMouseEnterActionButton,
        handleMouseLeaveActionButton,
        circle,
        mouse,
        delayMouse,
        textRef,
        buttonText,
        handleMouseEnterButton,
        handleMouseLeaveButton,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursorHover = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursorHover must be used within a CursorProvider");
  }
  return context;
};
