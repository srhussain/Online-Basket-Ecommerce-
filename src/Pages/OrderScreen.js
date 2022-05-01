import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { orderPayReducer } from "../reducers/orderReducer";
import { PayPalButton } from "react-paypal-button-v2";
import {
  getOrderDetail,
  payOrder,
  deliverOrders,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DETAILS,
  ORDER_DELIVER_RESET,
} from "../constants.js/orderConstants";

function OrderScreen({ match,history}) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, error, loading } = orderDetail;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingpay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const [sdkReady, setSdkReady] = useState(false);
  //   AXxtrHH5rLB_PQy1CZgDD37e3Rh6mElSmLEhYkeDm9_9E4kpbTPpmeBCfx8GtVLmPmXAt3g8lOkvfKdA
  const addPaypalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AXxtrHH5rLB_PQy1CZgDD37e3Rh6mElSmLEhYkeDm9_9E4kpbTPpmeBCfx8GtVLmPmXAt3g8lOkvfKdA";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if(!userInfo){
      history.push('/login')
    }
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({
        type: ORDER_PAY_RESET,
      });
      dispatch({
        type: ORDER_DELIVER_RESET,
      });
      dispatch(getOrderDetail(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler=()=>{
    dispatch(deliverOrders(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1> Order : {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name.toUpperCase()}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.username}`}>
                  {" "}
                  {order.user.username}
                </a>
              </p>
              <p>
                {" "}
                <strong>Shipping :</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalcode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method :</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X Rs {item.price}= Rs
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items :</Col>
                  <Col>Rs {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping :</Col>
                  <Col>{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax :</Col>
                  <Col>{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total :</Col>
                  <Col>{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingpay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
            {loadingDeliver && <Loader/>}
            {
              userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && <ListGroup.Item>
                <Button 
                type="button"
                className="btn btn-block"
                onClick={deliverHandler}>
                  Mark As Deliver
                </Button>
              </ListGroup.Item>
            }
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
