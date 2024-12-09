import "../../styles/globals.css";
import { Roboto, Lora } from "next/font/google";
import StoreProvider from "../StoreProvider";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer";
import NavigateBar from "@/components/ui/NavigateBar/NavigateBar";
import DarkModeActive from "@/components/admin/UI/Sidebar/DarkModeActive";
import LenisScroll from "@/utils/LenisScroll";
import Cursor from "@/components/ui/Cursor/Cursor";
import MessengerIcon from "@/components/ui/MessengerIcon/MessengerIcon";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
  display: "swap",
  variable: "--font-roboto",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});

const App = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html className={`${roboto.variable} ${lora.variable}`}>
      <head>
        <title>Care4Pet</title>
      </head>
      <body>
        <StoreProvider>
          <LenisScroll />
          <Cursor />
          <DarkModeActive />
          <Header />
          <main>{children}</main>
          <NavigateBar />
          <MessengerIcon />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
};

export default App;
