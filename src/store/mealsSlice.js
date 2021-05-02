import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meals: [],
  loadingMeals: false,
  errorLoadingMeals: false,
};

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    fetchMealsLoading(state) {
      state.loadingMeals = !state.loadingMeals;
    },
    fetchMealsError(state) {
      state.errorLoadingMeals = true;
    },
    fetchMealsSuccess(state, action) {
      state.meals = action.payload;
    },
  },
});

export const mealsActions = mealsSlice.actions;

export default mealsSlice.reducer;
