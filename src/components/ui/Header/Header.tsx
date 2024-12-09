"use client";

import SiteLink from "./SiteLink";
import HeaderContextProvider from "./_store/header-context";
import { memo } from "react";
import Logo from "./Logo";
const Header = memo(() => {
  return (
    <HeaderContextProvider>
      <div className="absolute left-4 top-4 z-50">
        <Logo />
        <SiteLink />
      </div>
    </HeaderContextProvider>
  );
});

Header.displayName = "Header";

export default Header;
