import React, { useContext } from "react";
import "./ProductListing.css"; 
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Card, Button } from "antd"; 
import flowersData from "../data/flowersData.json"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductListing = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
    <Header/>
    <div className="product-listing-container">
      <Card className="flower-list-card">
        <h1>Welcome to the Flower Market!</h1>
        <h2>Explore our wide range of beautiful flowers below:</h2>{" "}
        <ul className="flower-list">
          {flowersData &&
            flowersData.map((flower) => (
              <li key={flower.id} className="flower-item">
                <img
                  src={flower.image_url}
                  alt={flower.name}
                  className="flower-image"
                />
                <div className="flower-info">
                  <h3>{flower.name}</h3>
                  <p>{flower.description}</p>
                  <p>Price: Rs{flower.price}</p>
                </div>
                <div className="flower-buttons">
                  <Button
                    className="add-to-cart-btn"
                    disabled={cartItems.some((item) => item.id === flower.id)}
                    onClick={() => addToCart(flower)}
                  >
                    {cartItems.find((item) => item.id === flower.id)
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </Button>
                  {cartItems.find((item) => item.id === flower.id) && (
                    <Button
                      className="remove-from-cart-btn"
                      onClick={() => removeFromCart(flower.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </li>
            ))}
        </ul>
        <Button
          className="proceed-to-checkout-btn"
          onClick={goToCheckout}
          type="primary"
        >
          Proceed to Checkout
        </Button>
      </Card>
    </div>
    <Footer/>
  </>
  );
};

export default ProductListing;
