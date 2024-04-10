import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import useFetchCollection from "../CustomeHook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCT, selectproduct } from "../Redux/productSlice";
import Loader from "./Loader";
import { selectsearch, selectsearchs } from "../Redux/searchSlice";
import { STORE_CATEGORY, selectcategories } from "../Redux/categorySlice";
import {
  filterByCategory,
  filter_by_price,
  selectfilter,
  selectprice,
} from "../Redux/filterSlice";

const Product1 = () => {
  const { data, isLoading } = useFetchCollection("products");
  const categories = useFetchCollection("categories");
  const [categoriesdata, setCategoriesData] = useState("");
  const [price, setPrice] = useState(50);
  const [initialRender, setInitialRender] = useState(true);
  const dispatch = useDispatch();
  let products = useSelector(selectproduct);
  let searchProduct = useSelector(selectsearchs);
  const pricevalue = useSelector(selectprice);
  let categoryvalues = useSelector(selectcategories);
  let filtervalue = useSelector(selectfilter);
  useEffect(() => {
    dispatch(STORE_PRODUCT(data));
  }, [data]);
  useEffect(() => {
    dispatch(STORE_CATEGORY(categories.data));
  }, [categories.data]);
  //categories
  useEffect(() => {
    if (!initialRender) {
      dispatch(filterByCategory({ products, categoriesdata }));
    }
  }, [categoriesdata, initialRender]);

  //price
  useEffect(() => {
    if (!initialRender) {
      dispatch(filter_by_price({ products, price }));
    } else {
      setInitialRender(false);
    }
  }, [price, initialRender]);
  return (
    <>
      <div className="container">
        <div className="row">
          {isLoading && <Loader />}
          <div className="col-md-2">
            <h2>Filters</h2>
            <hr />
            <label>Categories</label>
            <select
              className="form-select"
              value={categoriesdata}
              onChange={(e) => setCategoriesData(e.target.value)}
            >
              {categoryvalues.map((item, index) => {
                return (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div className="mb-3 mt-2">
              <label className="form-label">Filter by Price</label>
              <input
                type="range"
                className="form-range"
                name="price"
                aria-describedby="helpId"
                min={50}
                max={5000}
                step={50}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p>Rs.{price}</p>
            </div>
          </div>
          <div className="col-md-10">
            {searchProduct.length == 0 ? (
              <ProductList product={products} />
            ) : (
              <ProductList product={searchProduct} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product1;
