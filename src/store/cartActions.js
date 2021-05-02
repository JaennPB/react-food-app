import axios from 'axios';

import { cartActions } from './cartSlice';

export const asyncOrderSubmit = (data) => {
  return async (dispatch) => {
    dispatch(cartActions.orderSubmitloading());
    try {
      await axios.post(
        'https://meal-delivery-app-4e7f3-default-rtdb.firebaseio.com/orders.json',
        data
      );
      dispatch(cartActions.orderSubmitSuccess());
      dispatch(cartActions.orderSubmitloading());
    } catch {
      dispatch(cartActions.orderSubmitError());
      dispatch(cartActions.orderSubmitloading());
    }
  };
};
