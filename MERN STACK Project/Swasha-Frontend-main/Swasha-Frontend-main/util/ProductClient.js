import { getProductsByIds, getSingleProduct, makeRequest } from "./ApiClient";
import { store } from "../redux/store";
import { updateProduct } from "../redux/slices/productSlice";

const waitlist = new Set();
export function fetchProduct(pid) {
  makeRequest(getSingleProduct, { productID: pid }, { noLog: true });
  if (!waitlist.size) {
    setTimeout(() => {
      if (!waitlist.size) return;
      const ls = Array.from(waitlist);
      waitlist.clear();
      makeRequest(
        getProductsByIds,
        { ids: ls },
        {
          onSuccess: (res) => {
            res.products.forEach((x) => {
              store.dispatch(updateProduct(x));
            });
          },
        }
      );
    }, 20);
  }
  if (!store.getState().product[pid]) waitlist.add(pid);
}
