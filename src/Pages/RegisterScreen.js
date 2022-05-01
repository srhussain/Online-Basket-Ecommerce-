import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function RegisterScreen({ history, location }) {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userReg } = userRegister;

  useEffect(() => {
    if (userReg) {
      history.push(redirect);
    }
  }, [history, userReg, redirect]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (password != confirmpassword) {
      setmessage("Password do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message &&<Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
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
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-3" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
