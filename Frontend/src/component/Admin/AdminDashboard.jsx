import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaProductHunt, FaUser, FaUserCircle } from "react-icons/fa";
const AdminDashboard = () => {
  const [activeLink, setActiveLink] = useState("/admin/adminhome");

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  return (
    <>
      <div className="container-fluid">
        <h1 className="text-center">Admin dashboard</h1>
        <hr />
        <div className="row overflow-hidden">
          <div className="col-md-2">
            <ul className="nav nav-pills flex-column mb-auto text-center">
              <li className="nav-item ">
                <Link
                  to="/admin"
                  className={`nav-link ${
                    activeLink === "" ? "bg-primary text-light" : ""
                  }`}
                  onClick={() => handleLinkClick("")}
                  style={{ color: "black" }}
                >
                  <FaUserCircle size={30} color="darkslategray" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/addcategory"
                  className={`nav-link ${
                    activeLink === "/admin/addcategory"
                      ? "bg-primary text-light"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("/admin/addcategory")}
                  style={{ color: "black" }}
                >
                  Add Category
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/viewcategory"
                  className={`nav-link ${
                    activeLink === "/admin/viewcategory"
                      ? "bg-primary text-light"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("/admin/viewcategory")}
                  style={{ color: "black" }}
                >
                  View Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/addproduct"
                  className={`nav-link ${
                    activeLink === "/admin/addproduct"
                      ? "bg-primary text-light"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("/admin/addproduct")}
                  style={{ color: "black" }}
                >
                  Add Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/viewproduct"
                  className={`nav-link ${
                    activeLink === "/admin/viewproduct"
                      ? "bg-primary text-light"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("/admin/viewproduct")}
                  style={{ color: "black" }}
                >
                  View Products
                </Link>
              </li>
              
              <li>
                <Link
                  to="/admin/vieworder"
                  className={`nav-link ${
                    activeLink === "/admin/vieworder"
                      ? "bg-primary text-light"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("/admin/vieworder")}
                  style={{ color: "black" }}
                >
                  View Orders
                </Link>
              </li>
            </ul>
          </div>
          <div class="col-md-10 p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
