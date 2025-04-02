import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import CartSidebar from './components/CartSidebar';
import SearchSidebar from './components/SearchSidebar';
import Checkout from './components/Checkout';
import './App.css';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="app">
        <div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        <h1 className="header">FAKESTORE2025</h1>
        <nav>
          <div className="navigation">
            <Link to="/">Home</Link>
            <a href="#">About</a>
            <Link to="/Checkout">Shop</Link>
          </div>
        </nav>

        <div className="layout">
          <SearchSidebar
            setSearchKeyword={setSearchKeyword}
            setSelectedCategory={setSelectedCategory}
            setSortBy={setSortBy}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  addToCart={addToCart}
                  searchKeyword={searchKeyword}
                  selectedCategory={selectedCategory}
                  sortBy={sortBy}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} setCart={setCart} clearCart={clearCart} />}
            />
          </Routes>
          <CartSidebar cart={cart} removeFromCart={removeFromCart} />
        </div>
        <div className='footer'>
          <p>Copyright@FakeStore2025 by HAO317</p>
        </div>
      </div>
    </Router>
  );
}

export default App;