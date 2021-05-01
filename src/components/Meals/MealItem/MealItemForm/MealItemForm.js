import { useRef } from "react";

import Input from "../../../UI/Input/Input";

import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  // submit only the value of form!! (AMOUNT) and pass to parent component
  const amountFromInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const amountValueFromRef = Number(amountFromInputRef.current.value);

    // passing amount to parent component via function ref
    props.onAddToCart(amountValueFromRef);
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <button>Add</button>
      <Input
        ref={amountFromInputRef}
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
    </form>
  );
};

export default MealItemForm;
