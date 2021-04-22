import Modal from "../UI/Modal/Modal";

import styles from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = [{ id: "c1", name: "sushi", amount: 2, price: 12.99 }].map(
    (item) => {
      return <li>{item.name}</li>;
    }
  );
  return (
    <Modal onClose={props.onCloseCartModal}>
      <ul className={styles.cartItems}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>12.99</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.buttonAlt} onClick={props.onCloseCartModal}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
