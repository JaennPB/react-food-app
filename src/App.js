import { connect } from "react-redux";

import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

const App = (props) => {
  return (
    <>
      {props.cartIsShown && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartIsShown: state.cart.modalIsShown,
  };
};

export default connect(mapStateToProps)(App);
