import * as actionTypes from "./actionTypes";

export const addItemToCart = (item) => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART,
    item: item,
  };
};
