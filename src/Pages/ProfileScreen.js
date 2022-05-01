import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col,Alert, Table} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  register,
  updateUserProfile,
} from "../actions/userActions";
import {  LinkContainer } from 'react-router-bootstrap'
import { USER_UPDATE_PROFILE_RESET } from "../constants.js/userConstant";
import { listMyOrders } from "../actions/orderActions";

function ProfileScreen({ history }) {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setmessage] = useState("");
  const [alert, setalert] = useState('')

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success,errors } = userUpdateProfile;
  
  const orderListMy = useSelector((state) => state.orderListMy);
  const {loading:loadingOrders,error:errorOrders,orders } = orderListMy;

useEffect(() => {
  if(alert){
    setTimeout(() => {
      console.log('Timeout true')
      setalert('')
      
      
    }, 3000);
  }
 
}, [alert])
  



  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id!==user._id) {
          dispatch({type:USER_UPDATE_PROFILE_RESET})
          dispatch(getUserDetails("profile"));
          dispatch(listMyOrders())
      } else {
        setname(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user,success]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (password != confirmpassword) {
      setmessage("Password do not match");
    } else {
      dispatch(updateUserProfile({
           'id': user._id ,
           'name':name,
           'email':email,
           'password':password

        }));
        setalert('Your Profile has been Updated !!!')
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        { errors ? ' ' :
           alert && ( <Alert variant="success" >{alert}</Alert>)
        }

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {errors && <Message variant="danger">{errors}</Message>}
        {loading && <Loader />}
        <Form onSubmit={SubmitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" className="mt-3" variant="primary" disabled={name==user.name && email==user.email && password==""}>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        { loadingOrders ? <Loader/> : (
          errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.map((order,_id)=>(
                    <tr key={order._id}>

                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                      <i className="fas fa-times" style={{color:"red"}}></i>
                    )}</td>
                    <td><LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer></td>
                    </tr>
          ))
                }
              </tbody>

            </Table>
          )
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
