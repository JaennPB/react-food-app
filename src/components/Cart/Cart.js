import { useDispatch, useSelector } from 'react-redux';

import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem/CartItem';
import Spinner from '../UI/Spinner/Spinner';

import { cartActions } from '../../store/cartSlice';

import styles from './Cart.module.css';
import Checkout from './Checkout/Checkout';

const Cart = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);
  const checkoutIsShown = useSelector(
    (state) => state.cart.checkoutFormIsShown
  );
  const submitLoading = useSelector((state) => state.cart.submitLoading);
  const submitError = useSelector((state) => state.cart.submitError);
  const submitSuccess = useSelector((state) => state.cart.submitSuccess);

  const addItemHandler = (item) => {
    dispatch(
      cartActions.addItemToCart({
        ...item,
        // setting amount back to 1 and NOT from child form
        amount: 1,
      })
    );
  };

  const removeItemHandler = (item) => {
    dispatch(cartActions.removeItemFromCart(item));
  };

  const startCheckoutHandler = () => {
    dispatch(cartActions.openCheckoutForm());
  };

  const closeCartModalHandler = () => {
    dispatch(cartActions.closeCartModal());
  };

  const orderResetHandler = () => {
    dispatch(cartActions.orderReset());
  };

  const cartItems = items.map((item) => {
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

  let totalAmount = total.toFixed(2);
  if (totalAmount <= 0) {
    totalAmount = 0;
  }

  const modalActionsBeforeCheckout = (
    <div className={styles.actions}>
      <button className={styles.buttonAlt} onClick={closeCartModalHandler}>
        Go back
      </button>
      {items.length > 0 && (
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
      {checkoutIsShown && <Checkout />}
      {checkoutIsShown || modalActionsBeforeCheckout}
    </>
  );

  let successOrErrorButton = null;

  if (submitError || submitSuccess) {
    successOrErrorButton = (
      <button className={styles.buttonAlt} onClick={orderResetHandler}>
        Go back
      </button>
    );
  }

  return (
    <Modal onClose={closeCartModalHandler}>
      {!submitLoading && !submitSuccess && !submitError && orderingModal}
      {submitLoading && <Spinner />}
      {submitError && <p>💥Error sending order, try again.💥</p>}
      {submitSuccess && <p>Order sent and received! It's on the way! 😋🥗</p>}
      {successOrErrorButton}
    </Modal>
  );
};

export default Cart;
