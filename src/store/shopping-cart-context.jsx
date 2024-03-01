import { createContext, useState, useReducer } from "react";
import {} from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

// Pass an initial value in the param.
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});
// UseReducer dispatch function.
function shoppingCartReducer(state, action) {
  const updatedItems = [...state.items];
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      //const updatedItems = [...state.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.id
        );
        updatedItems.push({
          id: action.id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }
      return {
        items: updatedItems,
      };
      break;
    case "UPDATE_CART_ITEM_QUANTITY":
      //const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.id
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };

      break;
    default:
      return state;
  }
}

/*
 * Let's create a wrapping CartContextProvider component
 * instead of setting all logic in the App.
 */
export default function CartContextProvider({ children }) {
  // UseReducer.
  const [shoppingCart, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });

  // Object to pass on all context wrapped components.
  const _contextValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  // useReducer instead of useState.
  function handleAddItemToCart(id) {
    // Call to reducer action function.
    // Param => object.
    shoppingCartDispatch({
      type: "ADD_ITEM_TO_CART",
      id: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    // Call to reducer action function.
    // Param => object.
    shoppingCartDispatch({
      type: "UPDATE_CART_CART_QUANTITY",
      id: productId,
      amount: amount,
    });
  }

  // Return.
  return (
    <CartContext.Provider value={_contextValue}>
      {children}
    </CartContext.Provider>
  );
}
