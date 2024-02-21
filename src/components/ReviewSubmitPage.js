import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Card, Table } from "antd";
import "./ReviewSubmitPage.css";
import ConfirmOrder from "./ConfirmOrder";
import Header from "./Header";
import Footer from "./Footer";

const ReviewAndSubmitOrderPage = () => {
  const {
    cartItems,
    customerInfo,
    clearCart,
    submitCustomerInfo,
    addToCart,
    totalAmount,
  } = useContext(CartContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0 || !customerInfo) {
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      const storedCustomerInfo =
        JSON.parse(localStorage.getItem("customerInfo")) || null;

      if (storedCartItems.length > 0) {
        clearCart();
        storedCartItems.forEach((item) => {
          addToCart(item);
        });
      }

      if (storedCustomerInfo) {
        submitCustomerInfo(storedCustomerInfo);
      }
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      console.log("Tab is being closed");
      return "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleConfirm = () => {
    setOrderConfirmed(true);
  };

  const handleKeepShopping = () => {
    clearCart();
    submitCustomerInfo(null);
    setOrderConfirmed(false);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("customerInfo");
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" style={{ width: "50px" }} />
      ),
    },
  ];

  const data = cartItems.map((item) => ({
    key: item.id,
    name: item.name,
    price: `Rs ${item.price}`,
    image: item.image_url,
  }));

  return (
    <>
      <Header />
      {!orderConfirmed ? (
        <div className="review-container">
          <main className="main-content-review">
            <div className="section left-section">
              <Card>
                <h2 className="heading">Cart Items</h2>
                <Table columns={columns} dataSource={data} pagination={false} />
              </Card>
              <div
                style={{
                  fontWeight: "bolder",
                  marginTop: "15px",
                  marginLeft: "15px",
                }}>
                Amount Due: Rs {totalAmount}
              </div>
            </div>
            <div className="section right-section">
              <Card>
                <h2 className="heading">Customer Information</h2>
                <div className="customer-info">
                  <p>First Name: {customerInfo?.firstName}</p>
                  <p>Last Name: {customerInfo?.lastName}</p>
                  <p>Email: {customerInfo?.email}</p>
                  <p>Phone: {customerInfo?.phone}</p>
                </div>
                {!orderConfirmed && (
                  <Button className="confirm-button" onClick={handleConfirm}>
                    Confirm Order
                  </Button>
                )}
              </Card>
            </div>
          </main>
        </div>
      ) : (
        
        <ConfirmOrder handleKeepShopping={handleKeepShopping} />
      )}
    { !orderConfirmed && <Footer />}
    </>
  );
};

export default ReviewAndSubmitOrderPage;
