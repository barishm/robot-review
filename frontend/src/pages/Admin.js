import { useState } from "react";
import ManageRobots from "../components/Admin/ManageRobots"
import ManageLinks from "../components/Admin/ManageLinks";
import ManageUsers from "../components/Admin/ManageUsers";
import ManageMostCompared from "../components/Admin/ManageMostCompared";

const  Admin = () => {
  const [activeComponent, setActiveComponent] = useState("Robots");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Robots":
        return <ManageRobots />;
      case "Users":
        return <ManageUsers />;
      case "Links":
        return <ManageLinks />;
      case "Most Compared":
        return <ManageMostCompared/>;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-auto col-xl-2 px-sm-2 px-0 bg-body-tertiary">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <a href="#" className="nav-link align-middle px-0" onClick={() => {setActiveComponent("Robots")}}>
                  <i className="fa-solid fa-broom" style={{ color: "#000000" }}></i>{" "}
                  <span className="ms-1 d-none d-md-inline text-bg-light">
                    Manage Robots
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#submenu1"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle"
                  onClick={() => {setActiveComponent("Links")}}
                >
                  <i className="fa-solid fa-link" style={{ color: "#000000" }}></i>{" "}
                  <span className="ms-1 d-none d-md-inline text-bg-light">
                    Manage Links
                  </span>{" "}
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-0 align-middle" onClick={() => {setActiveComponent("Users")}}>
                  <i className="fa-solid fa-user" style={{ color: "#000000" }}></i>{" "}
                  <span className="ms-1 d-none d-md-inline text-bg-light">
                    Manage Users
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-0 align-middle" onClick={() => {setActiveComponent("Most Compared")}}>
                    <i className="fa-solid fa-star" style={{ color: "#000000" }}></i>{" "}
                    <span className="ms-1 d-none d-md-inline text-bg-light">
                    Manage Most Compares
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col py-3">
          {renderActiveComponent()}
          </div>
      </div>
    </div>
  );
}
export default Admin;