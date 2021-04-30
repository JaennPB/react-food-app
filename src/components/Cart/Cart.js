import { connect } from "react-redux";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import * as actions from "../../store/actions/actionsIndex";

import styles from "./Cart.module.css";

const Cart = (props) => {
  const addItemHandler = (item) => {
    props.addItemToCart({
      ...item,
      // setting amount back to 1 and NOT from child form
      amount: 1,
    });
  };

  const removeItemHandler = (item) => {
    props.removeItemFromCart(item);
  };

  const cartItems = props.items.map((item) => {
    return (
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        // bind lets us pass arguments without invoking function
        onAdd={addItemHandler.bind(null, item)}
        onRemove={removeItemHandler.bind(null, item)}
      />
    );
  });

  let totalAmount = props.totalAmount.toFixed(2);
  if (totalAmount <= 0) {
    totalAmount = 0;
  }

  return (
    <Modal onClose={props.onCloseCartModal}>
      <ul className={styles.cartItems}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
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
    items: state.cart.items,
    totalAmount: state.cart.totalAmount,
  };
};

export default connect(mapStateToProps, actions)(Cart);
