import { connect } from "react-redux";

import HeaderCartIcon from "../../../Cart/HeaderCartIcon/HeaderCartIcon";
import classes from "./CartButton.module.css";

import styles from "./CartButton.module.css";

const CartButton = (props) => {
  // take props.items from redux store and .reduce() by amount to display on span
  const itemsInCart = props.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.clicked}>
      <span className={styles.icon}>
        <HeaderCartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{itemsInCart}</span>
    </button>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps)(CartButton);
