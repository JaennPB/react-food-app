import axios from "axios";

import * as actionTypes from "./actionTypes";

// ====================== OPEN/CLOSE MODAL

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

// ====================== EDIT ITEMS IN CART

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

// ====================== OPEN FORM

export const startCheckout = () => {
  return {
    type: actionTypes.START_CHECKOUT,
  };
};

// ====================== SUBMIT ORDER

const orderLoading = () => {
  return {
    type: actionTypes.ORDER_LOADING,
  };
};

const orderSuccess = () => {
  return {
    type: actionTypes.ORDER_SUCCESS,
  };
};

const orderError = () => {
  return {
    type: actionTypes.ORDER_ERROR,
  };
};

export const orderClear = () => {
  return {
    type: actionTypes.ORDER_CLEAR,
  };
};

export const asyncOrderSubmit = (data) => {
  return async (dispatch) => {
    dispatch(orderLoading());
    try {
      const res = await axios.post(
        "https://meal-delivery-app-4e7f3-default-rtdb.firebaseio.com/orders.json",
        data
      );
      dispatch(orderSuccess(res));
    } catch (error) {
      dispatch(orderError());
    }
  };
};
