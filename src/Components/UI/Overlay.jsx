import ReactDOM from "react-dom";
import styles from "./Overlay.module.css";
const Back = (props) => {
  return <div className={styles.back} onClick={props.closeCart} />;
};
const Modal = (props) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const Overlay = (props) => {
  const parent = document.getElementById("Overlay");
  return (
    <>
      {ReactDOM.createPortal(<Back closeCart={props.closeCart} />, parent)}
      {ReactDOM.createPortal(<Modal>{props.children}</Modal>, parent)}
    </>
  );
};

export default Overlay;
