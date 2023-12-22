import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [dataUser, setDataUser] = useState([]);
  const redirect = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/users")
      .then((res) => {
        setDataUser({ image: res.data.image });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="topbar-menu">
        <div className="menu">
          <span className="material-symbols-outlined menu-icon">dashboard</span>
          <span className="menu-text">Dashboard</span>
        </div>
      </div>
      <div className="topbar-search">
        <form className="search">
          <input
            type="text"
            id="search"
            name="search"
            autoComplete="on"
            className="search-input"
          />
        </form>
      </div>
      <div className="topbar-activity">
        <span className="material-symbols-outlined notification">
          notifications
        </span>
        <span className="material-symbols-outlined message">mail</span>
        <div className="image">
          <img
            className="image-user"
            src={`/src/assets/image/${dataUser.image}`}
            alt="profile"
          />
        </div>
      </div>
    </>
  );
}
