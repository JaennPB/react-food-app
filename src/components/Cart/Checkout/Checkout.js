import { useDispatch, useSelector } from 'react-redux';

import useValidity from '../../../hooks/useValidity';

import { cartActions } from '../../../store/cartSlice';
import { asyncOrderSubmit } from '../../../store/cartActions';

import styles from './Checkout.module.css';

const Checkout = (props) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);

  const textValidation = (value) =>
    value.trim() !== '' &&
    value.trim().length >= 5 &&
    value.trim().length <= 30;
  const pNvalidation = (value) => value.length !== 0 && value.length === 10;
  const pCValidation = (value) => value.length === 5;

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
  } = useValidity(pNvalidation);

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
  } = useValidity(pCValidation);

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

    const data = {
      userData: {
        name: enteredName,
        phoneNumber: enteredPN,
        street: enteredStreet,
        postalCode: enteredPC,
        city: enteredCity,
      },
      userOrder: {
        cartData,
        total: total,
      },
    };

    dispatch(asyncOrderSubmit(data));

    resetName();
    resetPN();
    resetStreet();
    resetPC();
    resetCity();
  };

  // TODO: fix css (form scrolling/hiding)
  // TODO: ADD Input component

  const closeCartModalHandler = () => {
    dispatch(cartActions.closeCartModal());
  };

  return (
    <form onSubmit={submitOrderHandler} className={styles.form}>
      <div className={`${styles.control} ${nameIsInvalid && styles.invalid}`}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={setName}
          onBlur={setNameIsTouched}
          value={enteredName}
        />
        {nameIsInvalid && (
          <p className={styles.errorText}>Please enter a valid name.</p>
        )}
      </div>
      <div className={`${styles.control} ${pNIsInvalid && styles.invalid}`}>
        <label htmlFor="pn">Phone Number</label>
        <input
          type="number"
          id="pn"
          onChange={setPN}
          onBlur={setPNIsTouched}
          value={enteredPN}
        />
        {pNIsInvalid && (
          <p className={styles.errorText}>Please enter a valid phone number.</p>
        )}
      </div>
      <div className={`${styles.control} ${streetIsInvalid && styles.invalid}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={setStreet}
          onBlur={setStreetIsTouched}
          value={enteredStreet}
        />
        {streetIsInvalid && (
          <p className={styles.errorText}>Please enter a valid street.</p>
        )}
      </div>
      <div className={`${styles.control} ${pCIsInvalid && styles.invalid}`}>
        <label htmlFor="pc">Postal Code</label>
        <input
          type="number"
          id="pc"
          onChange={setPC}
          onBlur={setPCIsTouched}
          value={enteredPC}
        />
        {pCIsInvalid && (
          <p className={styles.errorText}>Please enter a valid postal code.</p>
        )}
      </div>
      <div className={`${styles.control} ${cityIsInvalid && styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={setCity}
          onBlur={setCityIsTouched}
          value={enteredCity}
        />
        {cityIsInvalid && (
          <p className={styles.errorText}>Please enter a valid city.</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={closeCartModalHandler}>
          Go back
        </button>
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Checkout;
