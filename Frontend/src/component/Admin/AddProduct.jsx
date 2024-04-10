import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { STORE_CATEGORY, selectcategories } from "../../Redux/categorySlice";
import Loader from "../Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../Firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import useFetchCollection from "../../CustomeHook/useFetchCollection";
import { selectproduct } from "../../Redux/productSlice";

const AddProduct = () => {
  const { data } = useFetchCollection("categories");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_CATEGORY(data));
  }, [data]);
  let categories = useSelector(selectcategories);
  let obj = {
    category: "",
    name: "",
    price: "",
    quantity: "",
    imageUrl: "",
    desc: "",
  };
  let [product, setProduct] = useState(obj);
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [upload, setUpLoad] = useState(0);
  //Edit
  const { id } = useParams();
  let products = useSelector(selectproduct);
  let productEdit = products.find((item) => item.id == id);
  const [productImage, setProductImage] = useState([]);
  const [newImage, setNewImage] = useState([]);
  useEffect(() => {
    if (id) {
      setProduct({ ...productEdit });
      setProductImage(productEdit.imageUrl || []);
    } else {
      setProduct(obj);
    }
  }, [id]);
  let handleProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  let handleRemoveImage = (index, image) => {
    const updateImage = [...productImage];
    updateImage.splice(index, 1);
    setProductImage(updateImage);
    deleteObject(ref(storage, image));
  };
  let handleImage = (e) => {
    let image = e.target.files;
    let arr = [];
    Array.from(image).forEach((file) => {
      const storageRef = ref(storage, `Yummy-Tummy-image/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          const progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setUpLoad(progress);
        },
        (error) => {
          toast.error(error.message);
        },
        async () => {
          try {
            await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              arr.push(url);
              setNewImage((previousImage) => [...previousImage, url]);
            });
            setProduct({ ...product, imageUrl: arr });
          } catch (err) {
            toast.error(err.message);
          }
        }
      );
    });
  };
  let handleSubmitProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!id) {
      try {
        addDoc(collection(db, "products"), {
          category: product.category,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          imageUrl: product.imageUrl,
          desc: product.desc,
          createdAt: Timestamp.now().toDate(),
        });
        setIsLoading(false);
        toast.success("Product Added");
        navigate("/admin/viewproduct");
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    } else {
      const UpdateImage = [...productImage, ...newImage];

      try {
        setDoc(doc(db, "products", id), {
          category: product.category,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          imageUrl: UpdateImage,
          desc: product.desc,
          createdAt: productEdit.createdAt,
          editedAt: Timestamp.now().toDate(),
        });
        setIsLoading(false);
        toast.success("Product Added");
        navigate("/admin/viewproduct");
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <div className="container col-md-6 shadow">
        <h1 className="m-0">{id ? "Edit" : "Add"} Product</h1>
        <hr />
        {isLoading && <Loader />}
        <div className="">
          <form onSubmit={handleSubmitProduct} encType="multipart/form-data">
            <br />
            <div class="mb-3">
              <label for="" class="form-label">
                Category
              </label>
              <select
                name="category"
                className="form-select"
                onChange={handleProduct}
                value={product.category}
              >
                <option selected disabled value="">
                  choose One
                </option>
                {categories.map((c, i) => (
                  <option key={i}>{c.title}</option>
                ))}
              </select>
            </div>

            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                name="name"
                value={product.name}
                onChange={handleProduct}
              />
              <label for="formId1">Name of Food</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                name="price"
                value={product.price}
                onChange={handleProduct}
              />
              <label for="formId1">Price</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                name="quantity"
                value={product.quantity}
                onChange={handleProduct}
              />
              <label for="formId1">Qunatity</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="file"
                className="form-control"
                name="imageUrl"
                multiple
                onChange={handleImage}
              />
              <label for="formId1">Product Image</label>
            </div>
            {upload != 0 && (
              <div
                class="progress"
                role="progressbar"
                aria-label="Success striped example"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  class="progress-bar progress-bar-striped bg-success"
                  style={{ width: `${upload}%` }}
                >
                  {upload < 100
                    ? ` uploading ${upload}`
                    : `upload completed ${upload}%`}
                </div>
              </div>
            )}
            {id && (
              <>
                {productImage.map((image, i) => (
                  <React.Fragment key={i}>
                    <img
                      src={image}
                      width={100}
                      height={100}
                      style={{ border: "3px solid black", marginTop: "30px" }}
                    />
                    <a
                      type="button"
                      className="tex-danger me-2 "
                      style={{
                        position: "relative",
                        top: "-30px",
                        left: "-7px",
                        fontSize: "20px",
                      }}
                      onClick={() => handleRemoveImage(i, image)}
                    >
                      &times;
                    </a>
                  </React.Fragment>
                ))}
              </>
            )}
            <div class="mb-3">
              <label for="formId1"></label>
              <textarea
                class="form-control"
                name="desc"
                value={product.desc}
                onChange={handleProduct}
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              {id ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
