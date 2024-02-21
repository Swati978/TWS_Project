import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Welcome to our flower haven, where dreams blossom</h1>
      <nav className="navbar">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Shop</li>
          <li>Gallery</li>
          <li>Contact Us</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
