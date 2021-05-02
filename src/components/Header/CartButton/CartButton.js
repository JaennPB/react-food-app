import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import HeaderCartIcon from '../../Cart/HeaderCartIcon/HeaderCartIcon';

import styles from './CartButton.module.css';

const CartButton = (props) => {
  const items = useSelector((state) => state.cart.items);
  // adding animation!
  const [btnIsAnimating, setBtnIsAnimating] = useState(false);
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
      <span>Cart</span>
      <span className={styles.badge}>{itemsInCart}</span>
    </button>
  );
};

export default CartButton;
