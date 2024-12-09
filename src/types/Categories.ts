export interface Categories {
  _id: string;
  categoryName: string;
}

export interface CategoriesByPage {
  currentPage: number;
  totalPages: number;
  categories: Categories[];
}
