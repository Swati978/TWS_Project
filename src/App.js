import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ProductListing from "./components/ProductListing";
import CheckoutPage from "./components/CheckoutPage";
import ReviewAndSubmitOrderPage from "./components/ReviewSubmitPage";

function App() {
 
  return (

      <CartProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<ProductListing />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/review" element={<ReviewAndSubmitOrderPage />} />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </Router>
      </CartProvider>
  );
}
export default App;
