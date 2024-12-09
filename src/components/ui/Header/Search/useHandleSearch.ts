"use client";

import { debounce } from "lodash";
import { ChangeEvent, useState } from "react";
import { useGetProductsQuery } from "@/libs/features/services/product";

export default function useHandleSearch() {
  const [productName, setInputValue] = useState("");
  const { data: products } = useGetProductsQuery(
    { productName: productName, limit: 4 },

    {
      skip: !productName,
    },
  );
  const handleSearch = debounce((inputEvent: ChangeEvent<HTMLInputElement>) => {
    const { value } = inputEvent.target;
    setInputValue(value);
  }, 250);

  return { handleSearch, products };
}
