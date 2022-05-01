import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants.js/userConstant";


function EditUserScreen({ match, history }) {
  const userId = match.params.id;
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  
  const userUpdate = useSelector((state) => state.userUpdate);
  const { 
      error:errorUpdate, 
    loading:loadingUpdate,
    success :successUpdate
} = userUpdate;

  useEffect(() => {
      if(successUpdate){
          dispatch({
              type:USER_UPDATE_RESET
          })
          history.push('/admin/userlist')
      }else{
        if (!user.name || user._id !== Number(userId)) {
            dispatch(getUserDetails(userId));
          } else {
            setname(user.name);
            setEmail(user.email);
            setAdmin(user.isAdmin);
          }

      }
    
  }, [user, userId,successUpdate,history]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:user._id,name,email,isAdmin
    }))
  };

  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/> }
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={SubmitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setAdmin(e.target.checked)}
                style={{checked: "#1f9bcf"}}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" className="mt-3" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default EditUserScreen;
