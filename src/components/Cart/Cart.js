import { connect } from "react-redux";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import * as actions from "../../store/actions/actionsIndex";

import styles from "./Cart.module.css";
import Checkout from "./Checkout/Checkout";

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

  const startCheckoutHandler = () => {
    props.startCheckout();
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

  const modalActionsBeforeCheckout = (
    <div className={styles.actions}>
      <button className={styles.buttonAlt} onClick={props.closeCartModal}>
        Go back
      </button>
      {props.items.length > 0 && (
        <button className={styles.button} onClick={startCheckoutHandler}>
          Continue to checkout
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.closeCartModal}>
      <ul className={styles.cartItems}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {props.checkoutIsShown && <Checkout />}
      {props.checkoutIsShown || modalActionsBeforeCheckout}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    totalAmount: state.cart.totalAmount,
    checkoutIsShown: state.cart.checkoutIsShown,
  };
};

export default connect(mapStateToProps, actions)(Cart);
