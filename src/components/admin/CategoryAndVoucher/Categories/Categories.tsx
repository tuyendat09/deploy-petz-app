"use client";

import CategoriesTable from "./CategoriesTable";
import SubCategoriesTable from "./SubCategoriesTable";
import { RefetchProvider } from "./_store/reFetchContext";

export default function Categories() {
  return (
    <RefetchProvider>
      <div>
        <p className="mb-4 w-fit rounded-full bg-black px-8 py-2 text-h4 font-bold text-white shadow-sm shadow-[#3b284e] dark:bg-black dark:text-white">
          Danh mục - Danh mục con
        </p>

        <div className="flex gap-2">
          <CategoriesTable />
          <SubCategoriesTable />
        </div>
      </div>
    </RefetchProvider>
  );
}
