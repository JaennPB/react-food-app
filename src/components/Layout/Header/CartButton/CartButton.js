import { useEffect, useState } from "react";
import { connect } from "react-redux";

import HeaderCartIcon from "../../../Cart/HeaderCartIcon/HeaderCartIcon";

import styles from "./CartButton.module.css";

const CartButton = (props) => {
  // adding animation!
  const [btnIsAnimating, setBtnIsAnimating] = useState(false);

  const items = props.items;

  const bntStyles = `${styles.button} ${btnIsAnimating && styles.bump}`;

  // using useEffect to add 'side effect' of animation
  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsAnimating(true);

    const AnimationTimer = setTimeout(() => {
      setBtnIsAnimating(false);
    }, 300);

    return () => {
      clearTimeout(AnimationTimer);
    };
  }, [items]);

  const itemsInCart = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  return (
    <button className={bntStyles} onClick={props.clicked}>
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
    items: state.cart.items,
  };
};

export default connect(mapStateToProps)(CartButton);
