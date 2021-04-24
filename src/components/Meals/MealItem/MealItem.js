import { connect } from "react-redux";

import MealItemForm from "./MealItemForm/MealItemForm";
import * as actions from "../../../store/actions/actionsIndex";

import styles from "./MealItem.module.css";

const MealItem = (props) => {
  //receives amount from child form and sends new object as new item added to store [{}, {}, ...etc]
  const addItemToCartHandler = (amountFromChild) => {
    const item = {
      id: props.id,
      name: props.name,
      amount: amountFromChild,
      price: props.price,
    };

    props.addItemToCart(item);
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>${props.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default connect(null, actions)(MealItem);
