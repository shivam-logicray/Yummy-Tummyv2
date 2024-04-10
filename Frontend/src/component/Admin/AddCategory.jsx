import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Categories.css";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { toast } from "react-toastify";
const AddCategory = () => {
  let [categories, setCategories] = useState({ title: "", desc: "" });
  let navigate = useNavigate();
  let handleSubmitcategories = async (e) => {
    e.preventDefault();
    // alert(JSON.stringify(categories));
    let docref = collection(db, "categories");
    try {
      const res = await addDoc(docref,{...categories,createdAt:Timestamp.now().toDate()});
      toast.success("Categories added");
      navigate("/admin/viewcategory");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="container col-md-8 shadow p-3  addcategories">
      <h1>
        Add Categories
        <Link
          to={"/admin/viewcategory"}
          type="button"
          class="btn float-end btn-lg viewbutton"
        >
          View Categories
        </Link>
      </h1>
      <form onSubmit={handleSubmitcategories}>
        <div class="mb-3 ">
          <label for="" class="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id=""
            className="form-control"
            value={categories.title}
            onChange={(e) =>
              setCategories({ ...categories, title: e.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">
            Description
          </label>
          <textarea
            class="form-control"
            name="description"
            id=""
            rows="3"
            value={categories.desc}
            onChange={(e) =>
              setCategories({ ...categories, desc: e.target.value })
            }
          >
            {categories.desc}
          </textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
