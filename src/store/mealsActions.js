import axios from 'axios';

import { mealsActions } from './mealsSlice';

export const asyncFetchMeals = () => {
  return async (dispatch) => {
    dispatch(mealsActions.fetchMealsLoading());
    try {
      const res = await axios.get(
        'https://meal-delivery-app-4e7f3-default-rtdb.firebaseio.com/meals.json'
      );

      const fetchedMeals = [];
      for (const key in res.data) {
        fetchedMeals.push({ ...res.data[key], id: key });
      }
      dispatch(mealsActions.fetchMealsSuccess(fetchedMeals));
      dispatch(mealsActions.fetchMealsLoading());
    } catch {
      dispatch(mealsActions.fetchMealsError());
      dispatch(mealsActions.fetchMealsLoading());
    }
  };
};
