import React, { useState } from "react";

export const Context = React.createContext({
  items: [],
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (name) => {},
});

const CartContext = (props) => {
  const [items, setItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = (item) => {
    setTotalPrice(totalPrice + item.amount * item.price);
    const itemIdx = items.findIndex((i) => i.name === item.name);
    items[itemIdx]
      ? setItem(
          items.map((i) =>
            i.name === item.name ? { ...i, amount: i.amount + item.amount } : i
          )
        )
      : setItem(items.concat(item));
  };

  const removeItem = (name) => {
    const idx = items.findIndex((item) => item.name === name);
    const item = items[idx];
    setTotalPrice(totalPrice - item.price);
    if (item.amount === 1) {
      setItem(items.filter((i) => i.name !== item.name));
    } else {
      setItem(
        items.map((i) => (i === item ? { ...i, amount: i.amount - 1 } : i))
      );
    }
  };

  const clear = () => {
    setItem([]);
    setTotalPrice(0);
  };

  const cartData = {
    items,
    totalPrice,
    addItem,
    removeItem,
    clear,
  };
  return <Context.Provider value={cartData}>{props.children}</Context.Provider>;
};

export default CartContext;
