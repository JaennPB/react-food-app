import axios from "axios";

import * as actionTypes from "./actionTypes";

const getMealsSuccess = (meals) => {
  return {
    type: actionTypes.GET_MEALS_SUCCESS,
    meals: meals,
  };
};

const loadingMeals = () => {
  return {
    type: actionTypes.LOADING_MEALS,
  };
};

const getMealsError = () => {
  return {
    type: actionTypes.GET_MEALS_ERROR,
  };
};

export const asyncFetchMeals = () => {
  return async (dispatch) => {
    dispatch(loadingMeals());
    try {
      const res = await axios.get(
        "https://meal-delivery-app-4e7f3-default-rtdb.firebaseio.com/meals.json"
      );
      const fetchedMeals = [];
      for (const key in res.data) {
        fetchedMeals.push({ ...res.data[key], id: key });
      }
      dispatch(getMealsSuccess(fetchedMeals));
    } catch (error) {
      dispatch(getMealsError());
    }
  };
};
