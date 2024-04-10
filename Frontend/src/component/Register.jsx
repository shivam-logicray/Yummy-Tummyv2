import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/config";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import registerimage from './rlogo.jpeg'
let initialState = {
  username: "",
  email: "",
  password: "",
  cpassword: "",
  role: "user",
};

const Register = () => {
  let [user, setUser] = useState({ ...initialState });
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState({});
  const navigate = useNavigate();
  const validateValues = (user) => {
    let error = {};

    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    if (user.username == "") {
      error.username = "Username is required";
    } else if (!usernameRegex.test(user.username)) {
      error.username = "Invalid username";
    } else {
      error.username = "";
    }
    // ================================================================
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
    // ===================================================================
    if (user.cpassword == "") {
      error.cpassword = "Confirmpassword id required";
    } else if (user.password != user.cpassword) {
      error.cpassword = "Put confirmpassword same as password";
    } else {
      error.cpassword = "";
    }
    return error;
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        // Signed up
        const user1 = userCredential.user;
        const docRef = doc(db, "user", user1.uid);
        await setDoc(docRef, { ...user, createdAt: Timestamp.now().toDate() });
        setIsLoading(false);
        navigate("/home");
        toast.success("Register successfully");
        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="container mt-5">
      {isLoading && <Loader />}
      <div className="row border shadow">
        <div className="col-md-4">
          <img
            src={registerimage}
            style={{ width: "300px", height: "440px" }}
          />
        </div>
        <div className="col-md-6 mt-3">
          <form onSubmit={handleSubmit}>
            <br />
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                name="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <label for="formId1">Username</label>
              <span className="text-danger">{error.username}</span>
            </div>
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
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <label for="formId1">Password</label>
              <span className="text-danger">{error.password}</span>
            </div>
            <div class="form-floating mb-3">
              <input
                type="Password"
                class="form-control"
                name="cpassword"
                value={user.cpassword}
                onChange={(e) =>
                  setUser({ ...user, cpassword: e.target.value })
                }
              />
              <label for="formId1">ConfirmPassword</label>
              <span className="text-danger">{error.cpassword}</span>
            </div>
            <button type="submit" name="" class="btn btn-primary w-100">
              Register
            </button>
            <p>
              Already having account ?? <Link to="/login">Signin</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
