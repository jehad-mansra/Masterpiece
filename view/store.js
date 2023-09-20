import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartRedux";

export default configureStore({
  reducer: {
    cart: CartReducer,
  },
});
