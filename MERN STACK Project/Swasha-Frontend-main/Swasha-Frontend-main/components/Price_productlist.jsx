import { CurrencyFormatter } from "../util/StringUtil";

export default function Price({ price, discount, className, ...other }) {
  return (
    <span className={`${className}`}>
      <span className="mr-3 font-bold text-green-100">
        {CurrencyFormatter.format((price * (100 - discount)) / 100)}/-
      </span>
      {(discount || undefined) && (
        <>
          <s className="mr-3 font-semibold text-sm text-red-500">
            {CurrencyFormatter.format(price)}
          </s>
          <span className="text-[0.7rem] font-semibold align-middle text-gray-1200 text-semibold">
            {discount.toFixed(2)}% off
          </span>
        </>
      )}
    </span>
  );
}
