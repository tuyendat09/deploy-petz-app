"use client";

import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/libs/store";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { CursorProvider } from "@/components/ui/Cursor/_store/CursorContext";

const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const Store = store;

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <SessionProvider>
            <CursorProvider>{children}</CursorProvider>
          </SessionProvider>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
