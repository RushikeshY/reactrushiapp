import { updateUser } from "../redux/slices/userSlice";
import { store } from "../redux/store";

export function saveUserInfoFromServerIntoStore(dispatch, x) {
  dispatch(updateUser(x.user))
}

export function isUserLoggedIn(){
  const user = store.getState().user;
  if(user?.email) return true;
  return false;
}