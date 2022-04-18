import styles from "./MealItem.module.css";
import Input from "../UI/Input";
import { useContext, useRef, useState } from "react";
import { Context } from "../../Store/CartContext";

const MealItem = (props) => {
  const data = useContext(Context);
  const [valid, setValid] = useState(true);
  const addInput = useRef();
  const addMeal = (e) => {
    e.preventDefault();
    const amountString = addInput.current.value;
    const amount = +amountString;
    if (amountString.trim().length < 0 || amount < 1 || amount > 6) {
      setValid(false);
      return;
    }
    data.addItem({
      name: props.name,
      amount: amount,
      price: props.price.toFixed(2),
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h4 className=" fw-bold mb-2">{props.name}</h4>
        <p className=" m-0 fst-italic">{props.des}</p>
        <p className={styles.price}>${props.price.toFixed(2)}</p>
      </div>
      <form onSubmit={addMeal} className={styles.form}>
        <Input
          ref={addInput}
          label="Amount"
          input={{
            id: props.name,
            type: "number",
            min: "1",
            max: "6",
            step: "1",
            defaultValue: "1",
          }}
        />
        <button>+ Add</button>
        {!valid && <p>Please enter a valid amount (1-5)</p>}
      </form>
    </li>
  );
};

export default MealItem;
