import React, { useState } from "react";
import CheckoutSummary from "./CheckoutSummary";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { STORE_Checkout } from "../Redux/checkoutSlice";
import { useNavigate } from "react-router-dom";

let initialState = {
  recepitentname:localStorage.getItem("checkout")
  ? JSON.parse(localStorage.checkout).recepitentname
  : null,
  mobile: localStorage.getItem("checkout")
  ? JSON.parse(localStorage.checkout).mobile
  : null,
  address1: localStorage.getItem("checkout")
  ? JSON.parse(localStorage.checkout).address1
  : null,
  address2:localStorage.getItem("checkout")
  ? JSON.parse(localStorage.checkout).address2
  : null,
  country: localStorage.getItem("checkout")
  ? JSON.parse(localStorage.checkout).country
  : null,
  mstate: localStorage.getItem("checkout")
  ? JSON.parse(localStorage.checkout).mstate
  : null,
  city:localStorage.getItem("checkout")
  ? JSON.parse(localStorage.checkout).city
  : null,
  pincode:localStorage.getItem("checkout")
  ? JSON.parse(localStorage.checkout).pincode
  : null,
};
const CheckoutDetails = () => {
  let [shippingAdd, setShippingAdd] = useState({ ...initialState });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let handleSubmitShip = (e) => {
    e.preventDefault();
    // dispatch(STORE_Checkout(details))
    dispatch(STORE_Checkout(shippingAdd));
    navigate("/checkout");
  };
  return (
    <div className="container  mt-5 shadow p-3">
      <div className="row">
        <div className="col-md-6">
          <h1>CheckoutDetails</h1>
          <hr />
          <form onSubmit={handleSubmitShip}>
            <div className=" row ">
              <div class="form-floating mb-3  col-6">
                <input
                  type="text"
                  class="form-control"
                  name="recepitentname"
                  value={shippingAdd.recepitentname}
                  onChange={(e) =>
                    setShippingAdd({
                      ...shippingAdd,
                      recepitentname: e.target.value,
                    })
                  }
                />
                <label for="formId1">Recepitentname</label>
              </div>
              <div class="form-floating mb-3 col-6">
                <input
                  type="number"
                  class="form-control"
                  name="mobile"
                  value={shippingAdd.mobile}
                  onChange={(e) =>
                    setShippingAdd({
                      ...shippingAdd,
                      mobile: e.target.value,
                    })
                  }
                />
                <label for="formId1">MobileNumber</label>
              </div>
            </div>
            <div className="row">
              <div class="form-floating mb-3 col-6">
                <input
                  type="text"
                  class="form-control"
                  name="address1"
                  value={shippingAdd.address1}
                  onChange={(e) =>
                    setShippingAdd({
                      ...shippingAdd,
                      address1: e.target.value,
                    })
                  }
                />
                <label for="formId1">Address1</label>
              </div>
              <div class="form-floating mb-3 col-6">
                <input
                  type="text"
                  class="form-control"
                  name="address2"
                  value={shippingAdd.address2}
                  onChange={(e) =>
                    setShippingAdd({
                      ...shippingAdd,
                      address2: e.target.value,
                    })
                  }
                />
                <label for="formId1">Address2</label>
              </div>
            </div>
            <CountryDropdown
              classes="form-select"
              value={shippingAdd.country}
              onChange={(val) =>
                setShippingAdd({ ...shippingAdd, country: val })
              }
            />
            <div className="row">
              <div class="mb-3 col-6">
                <label for="" class="form-label">
                  State
                </label>
                <select
                  class="form-select"
                  name="state"
                  value={shippingAdd.mstate}
                  onChange={(e)=>setShippingAdd({...shippingAdd,mstate:e.target.value})}
                >
                  <option selected disabled value="">
                    Select State
                  </option>
                  <option value="1">Gujarat</option>
                </select>
              </div>
              <div class="mb-3 col-6">
                <label for="" class="form-label">
                  City
                </label>
                <select
                  class="form-select"
                  name="city"
                  value={shippingAdd.city}
                  onChange={(e) =>
                    setShippingAdd({
                      ...shippingAdd,
                      city: e.target.value,
                    })
                  }
                >
                  <option selected disabled value="">
                    Select city
                  </option>
                  <option value="1">Ahmedabad</option>
                  <option value="2">Vadodra</option>
                  <option value="">Rajkot</option>
                  <option value=""></option>
                  <option value="">UttarPradesh</option>
                  <option value="">UttarPradesh</option>
                  <option value="">UttarPradesh</option>
                  <option value="">UttarPradesh</option>
                  <option value="">UttarPradesh</option>
                </select>
              </div>
            </div>
            <div class="form-floating mb-3 col-6">
              <input
                type="number"
                class="form-control"
                name="pincode"
                value={shippingAdd.pincode}
                onChange={(e) =>
                  setShippingAdd({
                    ...shippingAdd,
                    pincode: e.target.value,
                  })
                }
              />
              <label for="formId1">PinCode</label>
            </div>
            <button type="submit" class="btn btn-primary col-6">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6 mt-3">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
