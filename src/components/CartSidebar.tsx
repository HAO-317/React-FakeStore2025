import React from 'react';
import { Link } from 'react-router-dom';
import './CartSidebar.css';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartSidebarProps {
  cart: CartItem[];
  removeFromCart: (id: number) => void;
}

function CartSidebar({ cart, removeFromCart }: CartSidebarProps) {
  return (
    <div className="cart-sidebar">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Shopping cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-thumbnail" />
              <div>
                <p>{item.title}</p>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
            </div>
          ))}
          <Link to="/checkout" className="checkout-btn">Complete your purchase ▶</Link>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;