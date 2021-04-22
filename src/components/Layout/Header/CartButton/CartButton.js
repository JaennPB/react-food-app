import HeaderCartIcon from "../../../Cart/HeaderCartIcon/HeaderCartIcon";
import classes from "./CartButton.module.css";

import styles from "./CartButton.module.css";

const CartButton = (props) => {
  return (
    <button className={classes.button} onClick={props.clicked}>
      <span className={styles.icon}>
        <HeaderCartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};

export default CartButton;
