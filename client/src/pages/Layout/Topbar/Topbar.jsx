import React, { useEffect, useState } from "react";
import supabase from "../../../../../server/config/supabase";
import axios from "axios";

export default function Topbar() {
  axios.defaults.withCredentials = true;
  const [dataImage, setDataImage] = useState([]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem("dataUser"));

    setDataImage({
      images: supabase.storage
        .from("Images")
        .getPublicUrl(getLocalStorage.dataUser.image),
    });

    console.log(dataImage);
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
          <img className="image-user" scr={dataImage.images} alt="profile" />
        </div>
      </div>
    </>
  );
}
