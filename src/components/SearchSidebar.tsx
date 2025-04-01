import React, { useState } from 'react';
import './SearchSidebar.css';

interface SearchSidebarProps {
  setSearchKeyword: (keyword: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: string) => void;
}

function SearchSidebar({ setSearchKeyword, setSelectedCategory, setSortBy }: SearchSidebarProps) {
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = () => {
    setSearchKeyword(keyword);
  };

  const handleReset = () => {
    setKeyword('');
    setSearchKeyword('');
    setSelectedCategory('');
    setSortBy('');
  };

  return (
    <div className="search-sidebar">
      <div className="search-section">
        <h3>Search</h3>
        <input
          type="text"
          placeholder="input keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="search-input"
        />
        <div className="search-buttons">
          <button onClick={handleSearch} className="search-btn">Search</button>
          <button onClick={handleReset} className="reset-btn">Reset</button>
        </div>
      </div>

      <div className="sort-section">
        <h3>Sorting</h3>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="search-select"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)} className="search-select">
          <option value="">Default sort</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default SearchSidebar;