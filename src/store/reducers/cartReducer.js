import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.ADD_ITEM_TO_CART:
      // TODO: review and refactor
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === actions.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItemsArray;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + actions.item.amount,
        };

        updatedItemsArray = [...state.items];
        updatedItemsArray[existingCartItemIndex] = updatedItem;
      } else {
        updatedItemsArray = state.items.concat(actions.item);
      }
      return {
        ...state,
        totalAmount: state.totalAmount + actions.item.price,
        items: updatedItemsArray,
      };
    default:
      return state;
  }
};

export default cartReducer;
