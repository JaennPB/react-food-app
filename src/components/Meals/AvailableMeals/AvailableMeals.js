import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../UI/Card/Card';
import Spinner from '../../UI/Spinner/Spinner';
import MealItem from '../MealItem/MealItem';

// action creator from redux
import { asyncFetchMeals } from '../../../store/mealsActions';

import styles from './AvailableMeals.module.css';

const AvailableMeals = (props) => {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals.meals);
  const isLoading = useSelector((state) => state.meals.loadingMeals);
  const error = useSelector((state) => state.meals.errorLoadingMeals);

  useEffect(() => {
    dispatch(asyncFetchMeals());
  }, [dispatch]);

  const mealsList = meals.map((el) => {
    return (
      <MealItem
        id={el.id}
        key={el.id}
        name={el.name}
        description={el.description}
        price={el.price}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        {isLoading && <Spinner />}
        {error && (
          <p className={styles.errorMsg}>
            Could not load meals... please try again!
          </p>
        )}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
