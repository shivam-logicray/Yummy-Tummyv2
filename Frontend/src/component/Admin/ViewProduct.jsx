import React, { useEffect, useState } from "react";
import { FaPenAlt, FaRupeeSign, FaTrash } from "react-icons/fa";
import useFetchCollection from "../../CustomeHook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCT, selectproduct } from "../../Redux/productSlice";
import { db, storage } from "../../Firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCT(data));
  }, [data]);
  let products = useSelector(selectproduct);
  console.log(products);

  let handleDelete = async (id, imageUrl) => {
   
    if (window.confirm("Are You sure You want Delete this ??")) {
      try {
        Array.from(imageUrl).forEach(async(file) => {
        await deleteObject(ref(storage, file));
        // window.location.reload();
      })
      await deleteDoc(doc(db, "products", id));
      toast.success(" Product deleted successFully");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <>
      <section>
        <h1 className="m-0">View Products</h1>
        <hr />
        <div className="row gap-2">
          {products.lenght == 0 && <h2>No Product Found</h2>}
          {products.map((item) => {
            return (
              <div className="col-4">
                <div class="card mb-3 p-3" style={{ maxwidth: "300px" }}>
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img
                        src={item.imageUrl}
                        class="img-fluid rounded-start"
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">Name:{item.name}</h5>
                        <p class="card-text">{item.desc}</p>
                        <p class="card-text">
                          <small class="text-body-secondary">
                            Price: {item.price}<FaRupeeSign/>
                          </small>
                        </p>
                        <Link
                          type="button"
                          class="btn btn-success me-2"
                          to={`/admin/edit/${item.id}`}
                        >
                          <FaPenAlt />
                        </Link>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => handleDelete(item.id, item.imageUrl)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ViewProduct;
