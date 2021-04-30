import { useState } from "react";

import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

const App = () => {
  const [cartModalShown, setCartModalShown] = useState(false);

  const openCartModal = () => {
    setCartModalShown(true);
  };

  const closeCartModal = () => {
    setCartModalShown(false);
  };

  return (
    <>
      {cartModalShown && <Cart onCloseCartModal={closeCartModal} />}
      <Header onOpenCartModal={openCartModal} />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
