import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectproduct } from "../Redux/productSlice";
import { FaRupeeSign } from "react-icons/fa";
import { add_to_cart, decrease, selectCartItem } from "../Redux/cartSlice";
import ReactImageMagnify from "react-image-magnify";
import ImageSlider from "./ImageSlider";
import { toast } from "react-toastify";

const ProductDetail = () => {
  let { id } = useParams();
  const product = useSelector(selectproduct);
  const data = product.find((item) => item.id == id);
  const cart = useSelector(selectCartItem);
  const itemdata = cart.find((item) => item.id == id);
  const itemIndex = cart.findIndex((item) => item.id == id);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  let handleProductDetails=()=>{
    dispatch(add_to_cart(data))
    toast.success('Product Added')
navigate('/cart')
  }
  return (
    <div className="container mt-5  ">
      <h2>Products Details</h2>
      <hr />
      <div className="row shadow p-3">
        <div className="col-md-5">
          <ImageSlider imgg={data.imageUrl} />
        </div>
        <div className="col-md-5">
          <h4>Category:{data.category}</h4>
          <p>Name:{data.name}</p>
          <p>
            Price:{data.price}
            <FaRupeeSign />
          </p>
          <p>Description:{data.desc}</p>
          <button
            type="button"
            class="btn col-md-6 me-2 "
            style={{ backgroundColor: "darkcyan" }}
            onClick={() => handleProductDetails(data)}
          >
            Add To Cart
          </button>
          {itemIndex != -1 && (
            <div className="m-2">
              <button
                className="col-md-1"
                onClick={() => decrease(add_to_cart(itemdata))}
              >
                -
              </button>
              <input
                type="text"
                value={itemdata.cartQuantity}
                style={{ width: "40px", textAlign: "center" }}
              />
              <button
                className="col-md-1"
                onClick={() => dispatch(add_to_cart(itemdata))}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
