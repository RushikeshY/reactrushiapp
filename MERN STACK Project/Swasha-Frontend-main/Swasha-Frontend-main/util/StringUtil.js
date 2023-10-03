export const truncateString = (str, len) => {
  if (!str) return str;
  if (str.length > len) str = str.slice(0, len - 3) + "...";
  return str;
};
export const objectToQuery = (o) => {
  let q = "";
  for (let [k, v] of Object.entries(o)) {
    q += `${k}=${v}&`;
  }
  if (q.endsWith("&")) q = q.slice(0, q.length - 1);
  return q;
};
export const CurrencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "INR",
  style: "currency",
  maximumFractionDigits: 0,
});

export function roundFloat(x, n = 1) {
  const mul = Math.pow(10, n);
  x = parseFloat(x);
  return Math.round(x * mul) / mul
}