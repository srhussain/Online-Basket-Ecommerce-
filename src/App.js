import logo from "./logo.svg";
// import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router,Route } from 'react-router-dom'

import Header from "./components/Header";
import { Footer } from "./components/Footer";
import HomeScreen from "./Pages/HomeScreen";
import ProductScreen from "./Pages/ProductScreen";
import CartScreen from "./Pages/CartScreen";
import LoginScreen from "./Pages/LoginScreen";
import RegisterScreen from "./Pages/RegisterScreen";
import ProfileScreen from "./Pages/ProfileScreen";
import ShippingScreen from "./Pages/ShippingScreen";
import PaymentScreen from "./Pages/PaymentScreen";
import PlaceOrderScreen from "./Pages/PlaceOrderScreen";
import OrderScreen from "./Pages/OrderScreen";
import UserListScreen from "./Pages/UserListScreen";
import UserEditScreen from "./Pages/UserEditScreen";
import ProductListScreen from "./Pages/ProductListScreen";
import ProductEditScreen from "./Pages/ProductEditScreen";
import OrderListScreen from "./Pages/OrderListScreen";


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          {/* <h1>Welcome</h1> */}
          <Route path="/" component={HomeScreen} exact/>
          <Route path="/product/:id" component={ProductScreen} exact/>
          <Route path="/cart/:id?" component={CartScreen} exact/>
          <Route path="/login" component={LoginScreen} exact/>
          <Route path="/register" component={RegisterScreen} exact/>
          <Route path="/profile" component={ProfileScreen} exact/>
          <Route path="/shipping" component={ShippingScreen} exact/>
          <Route path="/payment" component={PaymentScreen} exact/>
          <Route path="/placeorder" component={PlaceOrderScreen} exact/>
          <Route path="/order/:id" component={OrderScreen} exact/>
          <Route path="/admin/userList" component={UserListScreen} exact/>
          <Route path="/admin/user/:id/edit" component={UserEditScreen} exact/>
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} exact/>
          <Route path="/admin/productlist" component={ProductListScreen} exact/>
          <Route path="/admin/orderList" component={OrderListScreen} exact/>


        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
