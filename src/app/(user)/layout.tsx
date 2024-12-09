import "../../styles/globals.css";
import { Roboto, Lora } from "next/font/google";
import StoreProvider from "../StoreProvider";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer";
import NavigateBar from "@/components/ui/NavigateBar/NavigateBar";
import Sidebar from "@/components/pages/User/Sidebar/Sidebar";
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
          <Header />
          <main className="my-24">
            <div className="flex">
              <Sidebar />
              <div className="mx-auto w-3/4 px-12">{children}</div>
              <MessengerIcon />
            </div>
          </main>
          <NavigateBar />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
};

export default App;
