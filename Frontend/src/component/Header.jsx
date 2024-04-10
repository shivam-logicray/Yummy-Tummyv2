import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Css/Header.css";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaBitbucket,
  FaCartArrowDown,
  FaFirstOrderAlt,
  FaHome,
  FaOrcid,
  FaPenAlt,
  FaSearch,
  FaShoppingBag,
  FaShoppingBasket,
  FaShoppingCart,
  FaUserAlt,
  FaUserAltSlash,
  FaUserFriends,
  FaUserTie,
} from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../Firebase/config";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  logginuser,
  loggoutuser,
  loginuser,
  logoutuser,
  selectoruserName,
  selectoruserRole,
} from "../Redux/authSlice";
import { ShowOnLogOut, ShowOnLogin } from "./hiddenLinks";
import { selectCartItem } from "../Redux/cartSlice";
import useFetchCollection from "../CustomeHook/useFetchCollection";
import { STORE_PRODUCT, selectproduct } from "../Redux/productSlice";
import { STORE_SEARCH } from "../Redux/searchSlice";

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(selectoruserName);
  const role = useSelector(selectoruserRole);
  const cartItems = useSelector(selectCartItem);
  const [search, setSearch] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "user", user.uid);
        const docSnap = await getDoc(docRef);
        let obj = {
          userEmail: docSnap.data().email,
          userRole: docSnap.data().role,
          userName: docSnap.data().username,
          userId: user.uid,
        };
        dispatch(logginuser(obj));
      } else {
        dispatch(loggoutuser());
      }
    });
  }, [auth]);

  let handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("LoggedOut Successfully");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const { data } = useFetchCollection("products");
  useEffect(() => {
    dispatch(STORE_PRODUCT(data));
  }, [data]);
  const allproduct = useSelector(selectproduct);
  let handleSearch = (e) => {
    e.preventDefault();
    dispatch(STORE_SEARCH({ allproduct, search }));
  };
  useEffect(()=>{
    dispatch(STORE_SEARCH({ allproduct, search }));
  },[search])
  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Yummy-Tummy
          </a>
          <button
            class="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">
              <li class="nav-item">
                <Link
                  class="nav-link active home"
                  to={"/home"}
                  aria-current="page"
                >
                  <FaHome />
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active product"
                  to={"/product1"}
                  aria-current="page"
                >
                  <FaBitbucket />
                  Product
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle categories"
                  href="#"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Food Categories
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownId">
                  <Link class="nav-link  non-veg" to={"/product1"}>
                    Non-vegetarian
                  </Link>
                  <Link class="nav-link   non-veg" to={"/product1"}>
                    Chinese
                  </Link>
                  <Link class="nav-link  non-veg" to={"/product1"}>
                    Punjabi
                  </Link>
                  <Link class="nav-link  non-veg" to={"/product1"}>
                    Gujarati
                  </Link>
                  <Link class="nav-link   non-veg" to={"/product1"}>
                    Rajasthani
                  </Link>
                </div>
              </li>
            </ul>
            <form class="d-flex my-2 my-lg-0">
              <input
                class="form-control me-sm-2"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0 search"
                type="submit"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </form>
            <ul class="navbar-nav  mt-2 mt-lg-0">
              <li class="nav-item">
                <Link class="nav-link shoppingCart" to="/cart">
                  <FaShoppingCart />
                  <span
                    class="badge rounded-pill text-bg-info"
                    style={{ position: "relative", top: "-10px" }}
                  >
                    {cartItems.length}
                  </span>
                </Link>
              </li>
              <ShowOnLogOut>
                <li class="nav-item">
                  <Link
                    class="nav-link active me-2 register"
                    to="/register"
                    aria-current="page"
                  >
                    <FaPenAlt />
                    Register
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link login" to="/login">
                    <FaUserAlt />
                    Login
                  </Link>
                </li>
              </ShowOnLogOut>
              <ShowOnLogin>
                <li class="nav-item">
                  <a class="nav-link welcome">
                    <FaUserTie />
                    Hey {username}
                  </a>
                </li>
                {role == "user" && (
                  <li class="nav-item">
                    <Link class="nav-link myorder" to="/orderhistory">
                      <FaFirstOrderAlt />
                      Orders History
                    </Link>
                  </li>
                )}

                <li class="nav-item">
                  <button class="nav-link logout" onClick={handleLogout}>
                    <FaArrowAltCircleLeft />
                    LogOut
                  </button>
                </li>
              </ShowOnLogin>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
