import { useDispatch } from 'react-redux';

import image from '../../assets/headerImage.jpg';
import CartButton from './CartButton/CartButton';

import { cartActions } from '../../store/cartSlice';

import styles from './Header.module.css';

const Header = (props) => {
  const dispatch = useDispatch();

  const openCartModalHandler = () => {
    dispatch(cartActions.openCartModal());
  };

  return (
    <>
      <header>
        <div className={styles.toolbar}>
          <h1>Food Order</h1>
          <CartButton clicked={openCartModalHandler} />
        </div>
        <div className={styles.mainImage}>
          <img src={image} alt="header"></img>
        </div>
      </header>
    </>
  );
};

export default Header;
