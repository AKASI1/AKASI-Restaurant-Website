import React from "react";
import useInput from "../Hooks/useInput";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const name = useInput();
  const phone = useInput();
  const city = useInput();

  const confirm = (e) => {
    e.preventDefault();
    if (!name.valid) {
      name.setEntered(true);
      return;
    } else if (!phone.valid) {
      phone.setEntered(true);
      return;
    } else if (!city.valid) {
      city.setEntered(true);
    } else {
      props.submitOrder({
        Name: name.value,
        Phone: phone.value,
        City: city.value,
      });
      name.reset();
      phone.reset();
      city.reset();
    }
  };
  return (
    <form onSubmit={confirm} className={styles.form}>
      <div
        className={`${styles.control} ${name.invalid ? styles.invalid : ""}`}
      >
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          value={name.value}
          onChange={(e) => name.change(e)}
          onBlur={name.blur}
        />
        {name.invalid && <p>Please enter a Valid name!</p>}
      </div>
      <div
        className={`${styles.control} ${phone.invalid ? styles.invalid : ""}`}
      >
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          value={phone.value}
          onChange={phone.change}
          onBlur={phone.blur}
        />
        {phone.invalid && <p>Please enter a Valid Phone Number!</p>}
      </div>
      <div
        className={`${styles.control} ${city.invalid ? styles.invalid : ""}`}
      >
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city.value}
          onChange={city.change}
          onBlur={city.blur}
        />
        {city.invalid && <p>Please enter a Valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button onClick={props.onCancel} type="button">
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
