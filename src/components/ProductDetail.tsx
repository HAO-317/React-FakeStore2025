import React from 'react';
import './ProductDetail.css';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <img src={product.image} alt={product.title} className="modal-image" />
        <div className="modal-details">
          <h2>{product.title}</h2>
          <p className="price"><strong>Price: </strong>${product.price}</p>
          <p className="description">{product.description}</p>
          <p className="category"><strong>Category: </strong>{product.category}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;