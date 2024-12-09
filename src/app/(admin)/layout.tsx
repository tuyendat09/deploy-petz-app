import Sidebar from "@/components/admin/UI/Sidebar/Sidebar";
import "../../styles/globals.css";
import StoreProvider from "../StoreProvider";
import { Roboto, Roboto_Slab } from "next/font/google";
import DarkModeActive from "@/components/admin/UI/Sidebar/DarkModeActive";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
  display: "swap",
  variable: "--font-roboto",
});

const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--font-roboto-slab",
});

const App = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html className={`${roboto.variable} ${roboto_slab.variable}`}>
      <head>
        <title>Care4Pet</title>
      </head>
      <body>
        <StoreProvider>
          <div className="flex min-h-screen py-12">
            <DarkModeActive />

            <Sidebar />
            <div className="mx-auto w-3/4">{children}</div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
};

export default App;
