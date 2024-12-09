// CategoryFilterContext.ts
import { createContext } from "react";

interface Filters {
  category: string[];
  subCate: { [categoryId: string]: string[] };
}

interface CategoryFilterContextType {
  filters: Filters;
  handleCategoryToggle: (categoryId: string) => void;
  handleSubCategoryToggle: (categoryId: string, subCategoryId: string) => void;
}

export const CategoryFilterContext =
  createContext<CategoryFilterContextType | null>(null);
