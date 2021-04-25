import * as actionTypes from "./actionTypes";

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
