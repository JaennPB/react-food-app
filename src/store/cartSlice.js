import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  modalIsShown: false,
  checkoutFormIsShown: false,
  submitLoading: false,
  submitError: null,
  submitSuccess: false,
};

export const cartSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    openCartModal(state) {
      state.modalIsShown = true;
    },
    closeCartModal(state) {
      state.modalIsShown = false;
    },
    openCheckoutForm(state) {
      state.checkoutFormIsShown = true;
    },
    addItemToCart(state, action) {
      state.totalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      const existingCartItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingCartItem) {
        state.items.push(action.payload);
      } else if (existingCartItem) {
        existingCartItem.amount =
          existingCartItem.amount + action.payload.amount;
      }
    },
    removeItemFromCart(state, action) {
      const existingCartItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.totalAmount = state.totalAmount - existingCartItem.price;
      if (existingCartItem.amount === 1) {
        console.log('deleted item');
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else if (existingCartItem.amount > 1) {
        console.log('-1');
        existingCartItem.amount = existingCartItem.amount - 1;
      }
    },
    orderSubmitSuccess(state) {
      state.submitSuccess = true;
    },
    orderSubmitError(state) {
      state.submitError = false;
    },
    orderSubmitloading(state) {
      state.submitLoading = !state.submitLoading;
    },
    orderReset(state) {
      state.items = [];
      state.totalAmount = 0;
      state.modalIsShown = false;
      state.submitError = false;
      state.submitSuccess = false;
      state.checkoutFormIsShown = false;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
