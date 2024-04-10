import React from "react";
import ReactDOM from "react-dom";
// import "./Image/Loader/Wedges-3s-200px.gif";
import Lottie from "lottie-react";
import animationData from './LoaderAnimation.json'
import './Css/Loader.css'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="Wrapper">
      <div className="loader">
        {/* <img src={require("./Image/Loader/Wedges-3s-200px.gif")} /> */}
        <Lottie animationData={animationData}/>
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
