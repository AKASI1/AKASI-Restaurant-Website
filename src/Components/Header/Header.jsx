import styles from "./Header.module.css";
import Meals from "../../Images/meals.jpeg";
import { Context } from "../../Store/CartContext";
import { useContext, useEffect, useState } from "react";

const Header = (props) => {
  const data = useContext(Context);
  const [bump, setBump] = useState(false);
  const cartNum = data.items.reduce((num, item) => {
    return num + item.amount;
  }, 0);
  useEffect(() => {
    if (data.items.length === 0) {
      return;
    }
    setBump(true);
    setTimeout(() => {
      setBump(false);
    }, 300);
  }, [data.items]);
  return (
    <>
      <nav className={styles.nav}>
        <h1 className=" fs-3 fw-bold text-light m-0">AKASI</h1>
        <button onClick={props.showCart} className={bump ? styles.bump : ""}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span>Your cart</span>
          <span className={styles.badge}>{cartNum}</span>
        </button>
      </nav>
      <article className={styles["landing-image"]}>
        <img src={Meals} alt="Meals" />
      </article>
    </>
  );
};
export default Header;
