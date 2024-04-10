import React from "react";
import ProductItem from "./ProductItem";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const ProductList = ({ product }) => {
  return (
    <>
      <div className="mt-5">
        {product.length == 0 && <Loader />}
            <div className="row">
              {product.map((item, index) => {
                return <ProductItem key={product.id} product={item} />;
              })}
            </div>
        </div>
    </>
  );
};

export default ProductList;
