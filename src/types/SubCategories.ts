export interface SubCategories {
  _id: string;
  subCategoryName: string;
  categoryId: string;
}

export interface SubCategoriesByPage {
  currentPage: number;
  totalPages: number;
  subCategories: SubCategories[];
}
