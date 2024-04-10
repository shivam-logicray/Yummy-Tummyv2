import React from "react";
import "./Css/ProductItem.css";
import { useDispatch } from "react-redux";
import { add_to_cart } from "../Redux/cartSlice";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  let addtocart = () => {
    dispatch(add_to_cart(product));
  };
  return (
    <>
      <div className="col-md-3 mt-2 ">
        <div class="card image">
          <Link to={`/details/${product.id}`}>
            <img class="card-img-top " src={product.imageUrl[0]} height={150} />
          </Link>
          <div class="card-body">
            <h6 class="card-title">Name:{product.name}</h6>
            <p class="card-text">
              Price:{product.price}
              <FaRupeeSign />
            </p>
            <button
              type="button"
              className="btn btn-primary productbtn"
              style={{ backgroundColor: "darkcyan" }}
              onClick={addtocart}
            >
              AddToCart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
