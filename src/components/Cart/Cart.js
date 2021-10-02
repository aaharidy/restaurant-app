import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';
import useHttp from '../hooks/use-http'
import { Fragment } from 'react';

const Cart = props => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const cartClx = useContext(CartContext);
    const hasItems = cartClx.items.length > 0;
    const { isLoading, sentRequest: addOrder, error } = useHttp();

    const transformOrders = (data) => {
        setOrderSuccess(true);
        cartClx.clear();
    }

    const confirmOrder = orderData => {
        addOrder({
            url: 'https://react-http-bc183-default-rtdb.firebaseio.com/orders.json',
            method: 'POST',
            body: {
                user: orderData,
                orderItems: cartClx.items
            },
        }, transformOrders);
    }

    const cartItemRemoveHandler = id => {
        cartClx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartClx.addItem({ ...item, amount: 1 });
    }

    const cartItems = (<ul className={classes['cart-items']}>{
        cartClx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />)
    }</ul>);

    const showCheckoutHandler = () => {
        setShowCheckout(true);
    }

    const cartAction = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={showCheckoutHandler}>Order</button>}
    </div>;

    const cartModalContent = <Fragment>
        <div>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{`$${cartClx.totalAmount.toFixed(2)}`}</span>
            </div>
            {!showCheckout && !isLoading && cartAction}
            {showCheckout && !isLoading && <Checkout onConfirm={confirmOrder} onClose={props.onHideCart} />}
        </div>
    </Fragment>

    const isLoadingContent = <p>Sending...</p>;
    const orderSuccessContent = <p>Successfully sent the order.</p>;
    const errorContent = <p>{error}</p>;

    return <Modal onClose={props.onHideCart}>
        {!isLoading && !orderSuccess && cartModalContent}
        {isLoading && isLoadingContent}
        {orderSuccess && orderSuccessContent}
        {error && errorContent}
    </Modal>
}

export default Cart