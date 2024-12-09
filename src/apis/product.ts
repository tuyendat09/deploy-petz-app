"use server";

// const DOMAIN_URL = process.env.DOMAIN_URL;
const DOMAIN_URL = "http://localhost:8888/api";

export interface QueryParams {
  page?: number;
  productName?: string;
  status?: string;
  limit?: number;
  productCategory?: string | string[];
  productSlug?: string;
  productSubCategory?: string | string[];
  salePercent?: number;
  productStatus?: string;
  productBuy?: number;
}

export const getProduct = async (params: QueryParams) => {
  const options: any = {
    method: "GET",
    cache: "no-store", // Không cache dữ liệu
  };

  const queryParams = new URLSearchParams(
    params as Record<string, string>,
  ).toString();

  const response = await fetch(
    `${DOMAIN_URL}/product/?${queryParams}`,
    options,
  );

  return response.json();
};

export const getProductWithPaginate = async (params: QueryParams) => {
  const options: any = {
    method: "GET",
    // next: { revalidate: 3600 },
    cache: "no-store", // Không cache dữ liệu
  };

  const queryParams = new URLSearchParams(
    params as Record<string, string>,
  ).toString();
  const response = await fetch(
    `${DOMAIN_URL}/product/page?${queryParams}`,
    options,
  );

  return response.json();
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/delete-product`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }), // Send productId in the body
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    const data = await response.json();
    return data; // Assuming server returns some data after deletion
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error; // Rethrow the error for handling
  }
};
