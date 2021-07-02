export const currencyFormatter = (value: number) => {
  return value
    .toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })
    .slice(0, -3);
};
