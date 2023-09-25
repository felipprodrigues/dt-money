// import { getDate } from "date-fns";

export const dateFormatter = (date: string) => {
  if (!date) return;

  const getDate = date.split("T")[0].replace("/", "-");

  return getDate;
};

export const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
