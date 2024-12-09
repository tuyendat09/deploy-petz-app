"use client";
import { useContext } from "react";
import { HeaderContext } from "./_store/header-context";

export default function HeaderSearchButton() {
  const { handleToggleSearch } = useContext(HeaderContext);

  return (
    <>
      <li>
        <button onClick={handleToggleSearch}>Tìm kiếm</button>
      </li>
    </>
  );
}
