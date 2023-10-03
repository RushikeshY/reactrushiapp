import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToWishlist,
  makeRequest,
  removeFromWishlist,
} from "../../util/ApiClient";
import { HeartCircle } from "../svg";
import { isUserLoggedIn } from "../../util/data";
import { useRouter } from "next/router";
import { goToLogin } from "../../util/UrlUtils";

export default function WishlistButton({ productId, className, ...other }) {
  const router = useRouter();
  const inWishlist = useSelector((x) => x.wishlist[productId]);
  const cartItem = useSelector((x) => x.cart[productId]);
  return (
    <HeartCircle
      active={inWishlist}
      className={` ${className}`}
      onClick={(e) => {
        if (cartItem) return;
        if (!isUserLoggedIn()) {
          goToLogin(router);
          return;
        }
        if (inWishlist) {
          makeRequest(removeFromWishlist, { productId: productId });
        } else {
          makeRequest(addToWishlist, { productId: productId });
          // toast.success("Added to wishlist");
        }
      }}
    />
  );
}
