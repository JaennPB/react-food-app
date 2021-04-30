import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  totalAmount: 0,
};

// HELPER FUNCTIONS ====================================================================

const findDuplicates = (state, actions) => {
  // find index of duplicate (IF PRESENT)
  const updatedtTotalAmountAdd =
    state.totalAmount + actions.item.price * actions.item.amount;
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === actions.item.id
  );
  // grab actual object from items array (IF PRESENT)
  const existingCartItem = state.items[existingCartItemIndex];

  let updatedItemsArrayAdd;

  // if duplicate is found
  if (existingCartItem) {
    // creating new object
    const updatedDuplicateItem = {
      // spread all entries of duplicate
      ...existingCartItem,
      // updating "amount" of duplicate
      amount: existingCartItem.amount + actions.item.amount,
    };

    // making copy of original items array
    updatedItemsArrayAdd = [...state.items];
    // updating array inmutably
    updatedItemsArrayAdd[existingCartItemIndex] = updatedDuplicateItem;
  } else {
    // if no duplicated are found
    updatedItemsArrayAdd = state.items.concat(actions.item);
  }

  return [updatedItemsArrayAdd, updatedtTotalAmountAdd];
};

const removeItems = (state, actions) => {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === actions.item.id
  );
  const existingCartItem = state.items[existingCartItemIndex];
  const updatedtTotalAmountDel = state.totalAmount - existingCartItem.price;

  let updatedItemsArrayDel;

  if (existingCartItem.amount === 1) {
    updatedItemsArrayDel = state.items.filter(
      (item) => item.id !== actions.item.id
    );
  }

  if (existingCartItem.amount > 1) {
    const updatedItem = {
      ...existingCartItem,
      amount: existingCartItem.amount - 1,
    };
    updatedItemsArrayDel = [...state.items];
    updatedItemsArrayDel[existingCartItemIndex] = updatedItem;
  }

  return [updatedItemsArrayDel, updatedtTotalAmountDel];
};

// REDUCER ========================================================================

const cartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.ADD_ITEM_TO_CART:
      const [updatedItemsArrayAdd, updatedtTotalAmountAdd] = findDuplicates(
        state,
        actions
      );
      return {
        ...state,
        items: updatedItemsArrayAdd,
        totalAmount: updatedtTotalAmountAdd,
      };
    case actionTypes.REMOVE_ITEM_FROM_CART:
      const [updatedItemsArrayDel, updatedtTotalAmountDel] = removeItems(
        state,
        actions
      );
      return {
        ...state,
        items: updatedItemsArrayDel,
        totalAmount: updatedtTotalAmountDel,
      };
    default:
      return state;
  }
};

export default cartReducer;
