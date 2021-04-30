import * as actionTypes from "./actionTypes";

export const openCartModal = () => {
  return {
    type: actionTypes.OPEN_CART_MODAL,
  };
};

export const closeCartModal = () => {
  return {
    type: actionTypes.CLOSE_CART_MODAL,
  };
};

export const addItemToCart = (item) => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART,
    item: item,
  };
};

export const removeItemFromCart = (item) => {
  return {
    type: actionTypes.REMOVE_ITEM_FROM_CART,
    item: item,
  };
};

export const startCheckout = () => {
  return {
    type: actionTypes.START_CHECKOUT,
  };
};
