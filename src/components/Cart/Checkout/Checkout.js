import { connect } from "react-redux";

import useValidity from "../../../hooks/useValidity";

import styles from "./Checkout.module.css";

import * as actions from "../../../store/actions/actionsIndex";

const Checkout = (props) => {
  // TODO: fix css and validation functions
  const textValidation = (value) => value.trim() !== "";

  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    valueIsInvalid: nameIsInvalid,
    changeValueHandler: setName,
    blurInputHandler: setNameIsTouched,
    reset: resetName,
  } = useValidity(textValidation);

  const {
    enteredValue: enteredPN,
    valueIsValid: pNIsValid,
    valueIsInvalid: pNIsInvalid,
    changeValueHandler: setPN,
    blurInputHandler: setPNIsTouched,
    reset: resetPN,
  } = useValidity(textValidation);

  const {
    enteredValue: enteredStreet,
    valueIsValid: streetIsValid,
    valueIsInvalid: streetIsInvalid,
    changeValueHandler: setStreet,
    blurInputHandler: setStreetIsTouched,
    reset: resetStreet,
  } = useValidity(textValidation);

  const {
    enteredValue: enteredPC,
    valueIsValid: pCIsValid,
    valueIsInvalid: pCIsInvalid,
    changeValueHandler: setPC,
    blurInputHandler: setPCIsTouched,
    reset: resetPC,
  } = useValidity(textValidation);

  const {
    enteredValue: enteredCity,
    valueIsValid: cityIsValid,
    valueIsInvalid: cityIsInvalid,
    changeValueHandler: setCity,
    blurInputHandler: setCityIsTouched,
    reset: resetCity,
  } = useValidity(textValidation);

  let formIsValid = false;
  if (nameIsValid && pNIsValid && streetIsValid && pCIsValid && cityIsValid) {
    formIsValid = true;
  }

  const submitOrderHandler = (e) => {
    e.preventDefault();

    if (
      nameIsInvalid &&
      pCIsInvalid &&
      streetIsInvalid &&
      pCIsInvalid &&
      cityIsInvalid
    )
      return;

    console.log("order sent");
    console.log(enteredName);
    console.log(enteredPN);
    console.log(enteredStreet);
    console.log(enteredPC);
    console.log(enteredCity);

    resetName();
    resetPN();
    resetStreet();
    resetPC();
    resetCity();
  };

  // TODO: fix css (form scrolling/hiding)

  return (
    <form onSubmit={submitOrderHandler} className={styles.form}>
      <div className={styles.control}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={setName}
          onBlur={setNameIsTouched}
          value={enteredName}
        />
        {nameIsInvalid && (
          <p className="errorText">Please enter a valid name.</p>
        )}
      </div>
      <div className={styles.control}>
        <label htmlFor="pn">Phone Number</label>
        <input
          type="number"
          id="pn"
          onChange={setPN}
          onBlur={setPNIsTouched}
          value={enteredPN}
        />
        {pNIsInvalid && (
          <p className="errorText">Please enter a valid phone number.</p>
        )}
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={setStreet}
          onBlur={setStreetIsTouched}
          value={enteredStreet}
        />
        {streetIsInvalid && (
          <p className="errorText">Please enter a valid street.</p>
        )}
      </div>
      <div className={styles.control}>
        <label htmlFor="pc">Postal Code</label>
        <input
          type="number"
          id="pc"
          onChange={setPC}
          onBlur={setPCIsTouched}
          value={enteredPC}
        />
        {pCIsInvalid && (
          <p className="errorText">Please enter a valid postal code.</p>
        )}
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={setCity}
          onBlur={setCityIsTouched}
          value={enteredCity}
        />
        {cityIsInvalid && (
          <p className="errorText">Please enter a valid city.</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.closeCartModal}>
          Go back
        </button>
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default connect(null, actions)(Checkout);