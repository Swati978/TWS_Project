import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Table, Col, Row, Card } from "antd";
import "./CheckoutPage.css";
import Header from "./Header";
import Footer from "./Footer";

const CheckoutPage = () => {
  const { cartItems, submitCustomerInfo,totalAmount} = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (values) => {
    const emptyFields = Object.entries(values)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setErrorMessage(
        `Please fill in the following fields: ${emptyFields.join(", ")}`
      );
      return;
    } else {
      submitCustomerInfo(values);
      navigate("/review");
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image_url}
            alt={text}
            style={{ width: 50, marginRight: 10 }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `Rs${text}`,
    },
  ];

  return (
    <>
<Header/>
      <div className="checkout-container">
        <main className="main-content">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Items in Your Cart" className="section-card">
                <Table
                  rowKey="id"
                  dataSource={cartItems}
                  columns={columns}
                  pagination={false}
                />
                <div className="total-amount">
                  <p>Total Amount: Rs {totalAmount}</p>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Checkout Information" className="section-card">
                <Form
                  name="checkout-form"
                  onFinish={handleSubmit}
                  layout="vertical"
                  className="checkout-form">
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number",
                      },
                    ]}>
                    <Input maxLength={10} />
                  </Form.Item>
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submit-button">
                      Checkout Page
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default CheckoutPage;
