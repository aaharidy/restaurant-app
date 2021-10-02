import { useContext, useState, useEffect } from 'react'
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [animateButton, setAnimateButton] = useState(false);
    const cartClx = useContext(CartContext);
    const totalCartItems = cartClx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)
    const btnClasses = `${classes.button} ${animateButton && classes.bump}`;
    const { items } = cartClx;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setAnimateButton(true);

        const timer = setTimeout(() => {
            setAnimateButton(false);
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])
    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{totalCartItems}</span>
    </button>
}
export default HeaderCartButton