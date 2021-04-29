import * as actionTypes from "../actions/actionTypes";

const initalState = {
  meals: [],
  loading: false,
};

const mealsReducer = (state = initalState, actions) => {
  switch (actions.type) {
    case actionTypes.LOADING_MEALS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_MEALS_SUCCESS:
      return {
        ...state,
        meals: actions.meals,
        loading: false,
      };
    case actionTypes.GET_MEALS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default mealsReducer;
