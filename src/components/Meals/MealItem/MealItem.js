import MealItemForm from './MealItemForm/MealItemForm';
import { useDispatch } from 'react-redux';

// actions from redux
import { cartActions } from '../../../store/cartSlice';

import styles from './MealItem.module.css';

const MealItem = (props) => {
  const dispatch = useDispatch();
  // receives amount from child form and sends new object as new item added to store [{}, {}, ...etc]
  const addItemToCartHandler = (amountFromChild) => {
    const item = {
      id: props.id,
      name: props.name,
      amount: amountFromChild,
      price: props.price,
    };

    dispatch(cartActions.addItemToCart(item));
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>${props.price.toFixed(2)}</div>
      </div>
      <MealItemForm onAddToCart={addItemToCartHandler} />
    </li>
  );
};

export default MealItem;
