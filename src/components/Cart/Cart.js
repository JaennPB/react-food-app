import { connect } from "react-redux";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import Spinner from "../UI/Spinner/Spinner";

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

  // FIXME: REMOVE THIS, ADD ACTION DIRECTLY ON JSX
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

  const orderingModal = (
    <>
      <ul className={styles.cartItems}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {props.checkoutIsShown && <Checkout />}
      {props.checkoutIsShown || modalActionsBeforeCheckout}
    </>
  );

  let successOrErrorButton = null;

  if (props.submitError || props.submitSuccess) {
    successOrErrorButton = (
      <button className={styles.buttonAlt} onClick={props.orderClear}>
        Go back
      </button>
    );
  }

  return (
    <Modal onClose={props.closeCartModal}>
      {!props.submitLoading &&
        !props.submitSuccess &&
        !props.submitError &&
        orderingModal}
      {props.submitLoading && <Spinner />}
      {props.submitError && <p>💥Error sending order, try again.💥</p>}
      {props.submitSuccess && (
        <p>Order sent and received! It's on the way! 😋🥗</p>
      )}
      {successOrErrorButton}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    totalAmount: state.cart.totalAmount,
    checkoutIsShown: state.cart.checkoutIsShown,
    submitLoading: state.cart.submitLoading,
    submitSuccess: state.cart.submitSuccess,
    submitError: state.cart.submitError,
  };
};

export default connect(mapStateToProps, actions)(Cart);
