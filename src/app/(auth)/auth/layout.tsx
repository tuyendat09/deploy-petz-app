import "@/styles/globals.css";
import { Roboto, Roboto_Slab } from "next/font/google";

import StoreProvider from "../../StoreProvider";

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
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
};

export default App;
