import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const inFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formIsValid, setFormIsValid] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enterdName = nameInputRef.current.value;
        const enterdStreet = streetInputRef.current.value;
        const enterdPostalCode = postalCodeInputRef.current.value;
        const enterdCity = cityInputRef.current.value;

        const enterdNameIsValid = !isEmpty(enterdName);
        const enterdStreetIsValid = !isEmpty(enterdStreet);
        const enterdCityIsValid = !isEmpty(enterdCity);
        const enterdPostalCodeIsValid = inFiveChars(enterdPostalCode);

        setFormIsValid({
            name: enterdNameIsValid,
            street: enterdStreetIsValid,
            city: enterdCityIsValid,
            postalCode: enterdPostalCodeIsValid
        })

        const formValid = enterdNameIsValid && enterdStreetIsValid && enterdCityIsValid && enterdPostalCodeIsValid;

        if (!formValid) {
            return;
        }

        props.onConfirm({
            name: enterdName,
            street: enterdStreet,
            city: enterdCity,
            postalCode: enterdPostalCode
        })
    };

    const nameControlClasses = `${classes.control} ${formIsValid.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formIsValid.street ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formIsValid.city ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formIsValid.postalCode ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;