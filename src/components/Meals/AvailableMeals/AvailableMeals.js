import { useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../UI/Card/Card";
import Spinner from "../../UI/Spinner/Spinner";
import MealItem from "../MealItem/MealItem";

import * as actions from "../../../store/actions/actionsIndex";

import styles from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {
  const { asyncFetchMeals } = props;

  useEffect(() => {
    asyncFetchMeals();
  }, [asyncFetchMeals]);

  const mealsList = props.meals.map((el) => {
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
        {props.isLoading && <Spinner />}
        {props.error && (
          <p className={styles.errorMsg}>
            Could not load meals... please try again!
          </p>
        )}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals.meals,
    isLoading: state.meals.loading,
    error: state.meals.error,
  };
};

export default connect(mapStateToProps, actions)(AvailableMeals);
