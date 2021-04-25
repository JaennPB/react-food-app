import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  totalAmount: 0,
};

// HELPER FUNCTIONS ====================================================================

const findDuplicates = (state, actions) => {
  // find index of duplicate (IF PRESENT)
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === actions.item.id
  );
  // grab actual object from items array (IF PRESENT)
  const existingCartItem = state.items[existingCartItemIndex];

  let updatedItemsArray;

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
    updatedItemsArray = [...state.items];
    // updating array inmutably
    updatedItemsArray[existingCartItemIndex] = updatedDuplicateItem;
  } else {
    // if no duplicated are found
    updatedItemsArray = state.items.concat(actions.item);
  }
  return updatedItemsArray;
};

const removeItems = (state, actions) => {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === actions.item.id
  );
  const existingCartItem = state.items[existingCartItemIndex];
  const updatedtTotalAmount = state.totalAmount - existingCartItem.price;

  let updatedItemsArray;

  if (existingCartItem.amount === 1) {
    updatedItemsArray = state.items.filter(
      (item) => !item.id === actions.item.id
    );
  }

  if (existingCartItem.amount > 1) {
    const updatedItem = {
      ...existingCartItem,
      amount: existingCartItem.amount - 1,
    };
    updatedItemsArray = [...state.items];
    updatedItemsArray[existingCartItemIndex] = updatedItem;
  }

  return [updatedItemsArray, updatedtTotalAmount];
};

// REDUCER ========================================================================

const cartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.ADD_ITEM_TO_CART:
      const addedItems = findDuplicates(state, actions);
      return {
        ...state,
        totalAmount: state.totalAmount + actions.item.price,
        items: addedItems,
      };
    case actionTypes.REMOVE_ITEM_FROM_CART:
      const [removedItems, updatedtTotalAmount] = removeItems(state, actions);
      return {
        ...state,
        totalAmount: updatedtTotalAmount,
        items: removedItems,
      };
    default:
      return state;
  }
};

export default cartReducer;
