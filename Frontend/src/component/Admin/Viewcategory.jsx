import {
  DocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/config";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import useFetchCollection from "../../CustomeHook/useFetchCollection";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { STORE_CATEGORY, selectcategories } from "../../Redux/categorySlice";

const Viewcategory = () => {
  const { data, isLoading } = useFetchCollection("categories");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_CATEGORY(data));
  }, [data]);

  let categories=useSelector(selectcategories)

  let handleDelete = async (id) => {
    if (window.confirm("Are You sure You want Delete this ??")) {
      try {
        await deleteDoc(doc(db, "categories", id));
        toast.success("Deleted successFully");
        // window.location.reload();
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <div className="container mt-5 shadow ">
      <h2>
        All Categories
        <Link
          to={"/admin/addcategory"}
          type="button"
          class="btn float-end btn-lg viewbutton"
        >
          Add Categories
        </Link>
      </h2>
      <hr />
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <Loader />}
            {categories.length == 0 && (
              <tr>
                <td colSpan={4}>No Category Found</td>
              </tr>
            )}
            {categories.map((c, i) => {
              return (
                <tr key={i}>
                  <td>{c.id}</td>
                  <td>{c.title}</td> 
                  <td>{c.desc}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => handleDelete(c.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewcategory;
