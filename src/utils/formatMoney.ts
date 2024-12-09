export default function formatMoney(price: any) {
  if (price) {
    const formatedMoney = price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });

    return formatedMoney;
  }
}
