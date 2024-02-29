import { createContext } from "react";

// Pass an initial value in the param.
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});
