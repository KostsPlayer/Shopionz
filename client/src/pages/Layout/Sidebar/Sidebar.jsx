import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
  const [active, setActive] = useState(null);
  const [dataUser, setDataUser] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);
  const redirect = useNavigate();

  const handleItemClick = (index) => {
    setActive(index);
    console.log("Clicked index:", index);
  };

  const fetchDataMenu = () => {
    axios
      .get("http://localhost:5001/api/menu")
      .then((res) => {
        setDataMenu(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDataUser = () => {
    axios
      .get("http://localhost:5001/api/users")
      .then((res) => {
        setDataUser({
          name: res.data.name,
          email: res.data.email,
          image: res.data.image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDataMenu();
  }, []);

  useEffect(() => {
    fetchDataUser();
  }, []);

  const logout = () => {
    axios
      .post("http://localhost:5001/api/logout")
      .then((res) => {
        redirect("/login");
        localStorage.setItem("logoutMessage", res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="sidebar-header">
        <Link className="logo" to="/">
          Shopionz
        </Link>
      </div>
      <div className="sidebar-menu">
        {dataMenu.map((item, index) => (
          <div
            key={index}
            className={`container-menu ${active === index ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
          >
            {item.is_active === true ? (
              <Link to={`/${item.url}`} className="menu">
                <span className={`material-symbols-outlined`}>{item.icon}</span>
                <span className="menu-text">{item.name}</span>
              </Link>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="image">
          <img
            className="image-user"
            src={`/src/assets/image/${dataUser.image}`}
            alt="profile"
          />
        </div>
        <div className="user">
          <div className="user-name">{dataUser.name}</div>
          <div className="user-email">{dataUser.email}</div>
        </div>
        <div className="logout">
          <span className="material-symbols-outlined" onClick={logout}>
            logout
          </span>
        </div>
      </div>
    </>
  );
}
