import { connect } from "react-redux";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import * as actions from "../../store/actions/actionsIndex";

import styles from "./Cart.module.css";

const Cart = (props) => {
  const addItemHandler = (item) => {
    // TODO: review
    props.addItemToCart({
      ...item,
      amount: 1,
    });
  };

  const removeItemHandler = (id) => {};

  const cartItems = props.items.map((item) => {
    return (
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onAdd={addItemHandler.bind(null, item)}
        onRemove={removeItemHandler.bind(null, item.id)}
      />
    );
  });

  return (
    <Modal onClose={props.onCloseCartModal}>
      <ul className={styles.cartItems}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${props.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.buttonAlt} onClick={props.onCloseCartModal}>
          Close
        </button>
        {props.items.length > 0 && (
          <button className={styles.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    totalAmount: state.totalAmount,
  };
};

export default connect(mapStateToProps, actions)(Cart);
