import Overlay from "../UI/Overlay";
import styles from "./Cart.module.css";
import { Context } from "../../Store/CartContext";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const data = useContext(Context);
  const hasItems = data.items.length > 0;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const cancelCheckout = () => {
    setCheckout(false);
  };
  const onAdd = (item) => {
    data.addItem({ ...item, amount: 1 });
  };
  const onRemove = (id) => {
    data.removeItem(id);
  };

  const submitOrder = async (userData) => {
    setLoading(true);
    try {
      const request = await fetch(
        "https://akasi-f4c98-default-rtdb.firebaseio.com/Orders.json",
        {
          method: "post",
          body: JSON.stringify({
            User: userData,
            OrderedItems: data.items.concat({ TotalPrice: data.totalPrice }),
          }),
        }
      );
      if (!request.ok) {
        throw new Error();
      }
      setSubmited(true);
      data.clear();
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const content = (
    <>
      <ul className={styles.cartItems}>
        {data.items.map((item, idx) => (
          <CartItem
            key={idx}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={onAdd.bind(null, item)}
            onRemove={onRemove.bind(null, item.name)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${data.totalPrice.toFixed(2)}</span>
      </div>
      {checkout ? (
        <Checkout onCancel={cancelCheckout} submitOrder={submitOrder} />
      ) : (
        <div className={styles.actions}>
          <button onClick={props.closeCart} className={styles.close}>
            Close
          </button>
          {hasItems && (
            <button onClick={() => setCheckout(true)} className={styles.order}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  return (
    <Overlay closeCart={props.closeCart}>
      {!loading && !submited && !error && content}

      {loading && (
        <h5 className="text-center fw-bold my-4">
          Sending Order...
        </h5>
      )}

      {error && !submited && (
        <>
          <h5 className="text-center text-success fw-bold my-4">
            Something went wrong..
          </h5>
          <div className={styles.actions}>
            <button
              onClick={() => {
                setError(false);
                setLoading(false);
                setSubmited(false);
              }}
            >
              Try again
            </button>
          </div>
        </>
      )}
      {submited && (
        <>
          <h4 className="text-center text-success fw-bold my-4">
            Succefully sent the order!
          </h4>
          <div className={styles.actions}>
            <button onClick={props.closeCart}>Close</button>
          </div>
        </>
      )}
    </Overlay>
  );
};

export default Cart;
