import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  calculate_total,
  decrease,
  empty_cart,
  remove_From_Cart,
  save_url,
  selectCartItem,
  selectTotalAmount,
} from "../Redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaRupeeSign, FaTrash } from "react-icons/fa";
import { selectorisLoading } from "../Redux/authSlice";

const Cart = () => {
  const cartItem = useSelector(selectCartItem);
  const totalAmount = useSelector(selectTotalAmount);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectorisLoading);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(calculate_total());
  }, [cartItem]);

  let url = window.location.href;
  let checkOut = () => {
    if (isLoading) {
      navigate("/checkoutpage ");
    } else {
      navigate("/login");
      dispatch(save_url(url));
    }
  };
  return (
    <div className="container mt-5 shadow p-3">
      <h2>
        CartItems
        <Link
          to={"/cart"}
          type="button"
          class="btn float-end btn-lg viewbutton"
        >
          Add Products
        </Link>
      </h2>
      <hr />
      <div class="table-responsive">
        <table class="table table-primary">
          <thead>
            <tr>
              <th scope="col">Sr NO</th>
              <th scope="col">Category</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">TotalAmount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItem.length == 0 && (
              <tr>
                <td colSpan={7}>No Item Found</td>
              </tr>
            )}
            {cartItem.map((c, i) => {
              return (
                <tr key={i}>
                  <td scope="row">{i + 1}</td>
                  <td>{c.category}</td>
                  <td>{c.name}</td>
                  <td>
                    <img src={c.imageUrl} height={50} width={50} />
                  </td>
                  <td>{c.price}</td>
                  <td>
                    <button onClick={() => dispatch(decrease(c))}>-</button>
                    <input
                      type="text"
                      value={c.cartQuantity}
                      style={{ width: "40px", textAlign: "center" }}
                    />
                    <button onClick={() => dispatch(add_to_cart(c))}>+</button>
                  </td>
                  <td>{c.price * c.cartQuantity}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => dispatch(remove_From_Cart(i))}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => dispatch(empty_cart())}
        >
          EmptyCart
        </button>
        <div className="col-4 float-end">
          <div className="card p-2">
            <h4>
              Total:
              <span className="float-end">
                <FaRupeeSign />
                {totalAmount}
              </span>
            </h4>
            <hr />
            <div className="d-grid gap-2">
              <button
                type="button"
                class="btn"
                style={{ backgroundColor: "darkcyan" }}
                onClick={checkOut}
              >
                CheckOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
