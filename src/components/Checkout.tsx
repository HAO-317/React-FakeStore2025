import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  clearCart: () => void;
}

function Checkout({ cart, setCart, clearCart }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select payment method');
      return;
    }
    alert('Payment successful!');
    clearCart();
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Shopping cart is empty</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="checkout-thumbnail" />
                <div className="item-details">
                  <p>{item.title}</p>
                  <p>Price: ${item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
              </div>
            ))}
            <button onClick={clearCart} className="clear-btn">One-click clear</button>
          </div>
          <div className="summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="payment-select"
            >
              <option value="">Select payment method</option>
              <option value="visa">VISA</option>
              <option value="mc">MasterCard</option>
              <option value="paypal">PayPal</option>
              <option value="giftcard">Gift Card</option>
            </select>
            <button onClick={handlePayment} className="pay-btn">Pay</button>
            <Link to="/" className="continue-btn">Continue shopping</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;