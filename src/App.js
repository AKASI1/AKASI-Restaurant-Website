import { useState } from "react";
import Cart from "./Components/Cart/Cart.jsx";
import Header from "./Components/Header/Header.jsx";
import Meals from "./Components/Meals/Meals.jsx";
import MealSummary from "./Components/Meals/MealSummary.jsx";
import CartContext from "./Store/CartContext.js";

const App = () => {
  const [cartShown, setCartShown] = useState(false);
  const showCart = () => {
    setCartShown(true);
  };
  const closeCart = () => {
    setCartShown(false);
  };
  return (
    <CartContext>
      {cartShown && <Cart closeCart={closeCart} />}
      <Header showCart={showCart} />
      <MealSummary />
      <Meals />
    </CartContext>
  );
};

export default App;
