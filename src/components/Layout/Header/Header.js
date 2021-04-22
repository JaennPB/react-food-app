import image from "../../../assets/headerImage.jpg";
import CartButton from "./CartButton/CartButton";

import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header>
        <div className={styles.toolbar}>
          <h1>Food Order</h1>
          <CartButton clicked={props.onOpenCartModal} />
        </div>
        <div className={styles.mainImage}>
          <img src={image} alt="header"></img>
        </div>
      </header>
    </>
  );
};

export default Header;
