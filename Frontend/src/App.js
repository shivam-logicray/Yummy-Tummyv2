import logo from "./logo.svg";
import "./App.css";
import Register from "./component/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Slider from "./component/Slider";
import AdminDashboard from "./component/Admin/AdminDashboard";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Product1 from "./component/Product1";
import AddProduct from "./component/Admin/AddProduct";
import ViewProduct from "./component/Admin/ViewProduct";
import Viewcategory from "./component/Admin/Viewcategory";
import AddCategory from "./component/Admin/AddCategory";
import Cart from "./component/Cart";
import {
  ProtectAdmin,
  ProtectCart,
  ProtectProduct,
} from "./component/hiddenLinks";
import ProductDetail from "./component/ProductDetail";
import CheckoutDetails from "./component/CheckoutDetails";
import Checkout from "./component/Checkout";
import OrderHistory from "./component/OrderHistory";
import Order from "./component/Admin/Order";
import OrderDetalis from "./component/OrderDetalis";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="product1"
          element={
            <ProtectProduct>
              <Product1 />
            </ProtectProduct>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectAdmin>
              <AdminDashboard />
            </ProtectAdmin>
          }
        >
          <Route path="addproduct" element={<AddProduct />}></Route>
          <Route path="viewproduct" element={<ViewProduct />}></Route>
          <Route path="addcategory" element={<AddCategory />}></Route>
          <Route path="viewcategory" element={<Viewcategory />}></Route>
          <Route path="edit/:id" element={<AddProduct />}></Route>
          <Route path="vieworder" element={<Order />}></Route>
          <Route path="order-details/:id" element={<OrderDetalis />}></Route>
        </Route>
        <Route path="/details/:id" element={<ProductDetail />}></Route>
        <Route
          path="/checkoutpage"    
          element={
            <ProtectProduct>
              {" "}
              <CheckoutDetails />{" "}
            </ProtectProduct>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <ProtectProduct>
              <Checkout />
            </ProtectProduct>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <ProtectCart>
              <Cart/>
            </ProtectCart>
          }
        ></Route>
        <Route
          path="/orderhistory"
          element={
            <ProtectProduct>
              <OrderHistory />
            </ProtectProduct>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
