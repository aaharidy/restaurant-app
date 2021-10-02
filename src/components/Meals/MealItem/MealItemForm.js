import { useRef, useState } from 'react';
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = props => {
    const inputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = inputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().lenght === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }
        setAmountIsValid(true);
        props.onAddToCart(enteredAmountNumber);
    }
    return <div>
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={inputRef} label="Amount" input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
            }} />
            {!amountIsValid && <span>Please enter a vaild number (1-5).</span>}
            <button>+ Add</button>
        </form>
    </div>
}

export default MealItemForm