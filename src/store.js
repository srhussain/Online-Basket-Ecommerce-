import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailsReducers,
  productDeleteReducers,
  productCreateReducers,
  productUpdateReducers,
  productCreateReviewReducers,
  productTopRatedReducers
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  userDetailsReducers,
  userLoginReducers,
  userProfileUpdateReducers,
  userRegisterReducers,
  userListReducers,
  userDeleteReducers,
  userUpdateReducers,
} from "./reducers/userReducers";
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from "./reducers/orderReducer";



const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productDelete:productDeleteReducers,
  productCreate:productCreateReducers,
  productUpdate:productUpdateReducers,
  productReviewCreate:productCreateReviewReducers,
  productTopRated:productTopRatedReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userProfileUpdateReducers,
  orderCreate:orderCreateReducer,
  orderDetail:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderDeliver:orderDeliverReducer,
  orderListMy:orderListMyReducer,
  orderList:orderListReducer,
  userList:userListReducers,
  userDelete:userDeleteReducers,
  userUpdate:userUpdateReducers,


});

const cartItemFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAdressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  :{};

const initialState = {
  cart: {
    cartItems: cartItemFromLocalStorage,
    shippingAddress: shippingAdressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
