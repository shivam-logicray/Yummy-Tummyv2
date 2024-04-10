import React, { useState } from "react";
import Loader from "./Loader";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/config";
import { useSelector } from "react-redux";
import { selectUrl } from "../Redux/cartSlice";
import loginimage from '../component/loginImage.jpg'
let initialState = { email: "", password: "" };

const Login = () => {
  let [user, setUser] = useState({ ...initialState });
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState({});
  let navigate = useNavigate();
  let PreviousUrl = useSelector(selectUrl);
  let redirectUrl = () => {
      if (PreviousUrl.includes("cart")) {
        navigate("/cart");
      } else {
        navigate("/");
      }
  };

  const validateValues = (user) => {
    let error = {};

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (user.email == "") {
      error.email = "Email is required";
    } else if (!emailRegex.test(user.email)) {
      error.email = "Use pattern and fill";
    } else {
      error.email = "";
    }
    // ==================================================================
    const passwordRegex = /^.{6,12}$/;

    if (user.password == "") {
      error.password = "Password is required";
    } else if (!passwordRegex.test(user.password)) {
      error.password = "Password minimum 6digit and maximum 12 digit";
    } else {
      error.password = "";
    }
  };

  let handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "user", user.uid);
        const docSnap = await getDoc(docRef);
        let role = docSnap.data().role;
        if (role == "admin") {
          toast.success("Logged in successfully");
          setIsLoading(false);
          navigate("/admin");
        } else if (role == "user") {
          toast.success("Logged in successfully");
          setIsLoading(false);
          navigate("/home");
          redirectUrl();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
        toast.error(error.code);
      });
    // localStorage.setItem("auth",JSON.stringify(user.email))
  };
  const provider = new GoogleAuthProvider();
  let handleGoogle = () => {
    setIsLoading(true);
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const docRef = doc(db, "user", user.uid);
        await setDoc(docRef, {
          email: user.email,
          username: user.displayName,
          role: "user",
          createdAt: Timestamp.now().toDate(),
        });
        toast.success("Logged in successfully");
        setIsLoading(false);
        navigate("/home");
        redirectUrl();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
        toast.error(error.code);
      });
  };

  return (
    <>
      <h1 className="text-center">Login Page</h1>
      <hr />
      <div className="container mt-5">
        {isLoading && <Loader />}
        <div className="row  shadow">
          <div className="col-md-4">
            <img
              src={loginimage}
              style={{ width: "300px", height: "440px" }}
            />
          </div>
          <div className="col-md-6 mt-3">
            <form onSubmit={handleLogin}>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <label for="formId1">Email</label>
                <span className="text-danger">{error.email}</span>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="Password"
                  class="form-control"
                  name="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <label for="formId1">Password</label>
                <span className="text-danger">{error.password}</span>
              </div>
              <button type="submit" name="" class="btn btn-primary w-100 mb-2">
                Login
              </button>

              <button
                type="button"
                name=""
                class="btn btn-danger w-100 mb-2"
                onClick={handleGoogle}
              >
                Login with Google
              </button>
              <p style={{ position: "relative", right: "10px" }}>
                Create Account ?? <Link to={"/register"}>Sign UP</Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
