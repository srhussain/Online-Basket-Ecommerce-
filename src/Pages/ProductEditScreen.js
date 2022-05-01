import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants.js/userConstant";
import { PRODUCT_UPDATE_RESET } from "../constants.js/productConstants";
import axios from "axios";



function ProductEditScreen({ match, history }) {
  const productId = match.params.id;
  const [name, setname] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productList");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setname(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setCategory(product.category);
      }
    }
  }, [product, productId, history, dispatch,successUpdate]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id:productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }))
    // Update product
  };

  const uploadFileHandler=async (e)=>{
    const file=e.target.files[0]
    const formData=new FormData()

    formData.append('image',file)
    formData.append('product_id',productId)

    setUploading(true)

    try{
      const config={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data}=await axios.post('/api/products/upload/',formData,config)
      setImage(data)
      setUploading(false)

    }catch(error){
      setUploading(false)

    }
  }

  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>
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

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="price"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              >
                
              </Form.Control>
              <Form.Group controlId="formFile">
                {/* <Form.Label>Default</Form.Label> */}
                <Form.Control type='file'
                
                onChange={uploadFileHandler}/>
                </Form.Group>
                {uploading && <Loader/>}

            </Form.Group>

            <Form.Group controlId="brand"  className="py-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
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

export default ProductEditScreen;
