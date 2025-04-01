import React, { useState, useEffect } from 'react';
import ProductModal from './ProductDetail';
import './Home.css';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

interface HomeProps {
  addToCart: (product: Product) => void;
  searchKeyword: string;
  selectedCategory: string;
  sortBy: string;
}

function Home({ addToCart, searchKeyword, selectedCategory, sortBy }: HomeProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to get the product:', err));
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesKeyword = searchKeyword
        ? product.title.toLowerCase().includes(searchKeyword.toLowerCase())
        : true;
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesKeyword && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'category') return a.category!.localeCompare(b.category!);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="home">
      <h2>Product List</h2>
      {filteredProducts.length === 0 ? (
        <p>No matching products found</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => openModal(product)} className="details-btn">
                View details
              </button>
              <button onClick={() => addToCart(product)} className="cart-btn">
                Add to the cart
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
}

export default Home;