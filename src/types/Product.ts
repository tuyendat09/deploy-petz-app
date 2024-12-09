interface ProductDetailDescription {
  _id: string;
  detailContent: string;
}

export interface ProductOption {
  _id: string;
  name: string;
  productPrice: number;
  productName: number;
  productQuantity: number;
  productThumbnail: string;
}

export interface Product {
  length: any;
  name: any;
  _id: string;
  productName: string;
  salePercent: number;
  productBuy: number;
  productSlug: string;
  productThumbnail: string;
  productImages: [];
  productDescription: string;
  productDetailDescription: ProductDetailDescription;
  productCategory: string;
  productSubCategory: string;
  productRating: number;
  productOption: ProductOption[];
  ratingCount: number;
}

export interface PaginateProduct {
  productCategory?: string;
  products: Product[];
  currentPage: number;
  totalPages: number;
}
