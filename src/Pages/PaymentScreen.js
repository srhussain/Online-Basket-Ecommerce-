import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={SubmitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e)=>setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
