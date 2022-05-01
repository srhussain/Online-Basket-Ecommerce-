import React, { useState, useEffect } from "react";
import products from "../products";
import { Row, Col, Alert } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";


function HomeScreen({history}) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products,page,pages } = productList;
  // ALERT
  const [show, setShow] = useState(true);
  const [timeOut, settimeOut] = useState(null)
  const userRegister = useSelector((state) => state.userRegister);
  const { userReg } = userRegister;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword=history.location.search

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch,keyword]);
  
  useEffect(() => {
    setTimeout(() => {
      settimeOut(1)
      
    }, 3000);
    
  }, [1])
  
  return (
    <div>
      {
        userReg ?( 
          userReg && show ? timeOut!==1 && (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              You have successfully registered and logged in !
            </Alert>
          ): " "
        ) : ( userInfo && show ? timeOut!==1 && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            You have successfully logged in !
          </Alert>
        ): " ")
      }
      

      {!keyword && <ProductCarousel/>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>

        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword}/>
          </div>
      )}
    </div>
  );
}

export default HomeScreen;
