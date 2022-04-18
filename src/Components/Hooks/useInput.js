import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");
  const [entered, setEntered] = useState(false);
  const valid = value.trim() !== "";
  const invalid = !valid && entered;

  const change = (e) => {
    setValue(e.target.value);
  };
  const blur = () => setEntered(true);
  const reset = () => {
    setValue("");
    setEntered(false);
  };

  return { value, valid, invalid, change, blur, reset, setEntered };
};
export default useInput;
