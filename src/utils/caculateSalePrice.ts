export default function calculateSalePrice(
  productSalePercent: number,
  productPrice: number,
) {
  // Tính số tiền được giảm
  const discount = productSalePercent
    ? productPrice * (productSalePercent / 100)
    : 0;

  // Tính giá sau khi giảm
  const salePrice = productPrice - discount;

  return { salePrice };
}
