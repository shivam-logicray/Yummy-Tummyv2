import React, { useEffect } from "react";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import Product1 from "./Product1";

const Home = () => {
  // useEffect(() => {
  //   fetch("http://localhost:1000/")
  //     .then((res) => {
  //       return res.json().then((data) => console.log(data));
  //     })
  //     .catch((err) => console.log(err));
  // },[]);
  return (
    <>
      <Product1 />
    </>
  );
};

export default Home;
