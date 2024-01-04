import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";

export default function Profile() {
  const [dataUser, setDataUser] = useState([]);

  const getLocalStorage = JSON.parse(localStorage.getItem("dataUser"));
  const getImageUrl = JSON.parse(localStorage.getItem("imageUrl"));

  useEffect(() => {
    setDataUser({
      name: getLocalStorage.dataUser.name,
      email: getLocalStorage.dataUser.email,
      phoneNumber: getLocalStorage.dataUser.phone_number,
      role: getLocalStorage.dataUser.roles.roles,
      date: getLocalStorage.dataUser.date_available,
      images: getImageUrl.imageUrl.publicUrl,
    });
  }, []);

  return (
    <>
      <Layout>
        <h1>Hello World!</h1>
        <img
          src={dataUser.images}
          alt="profile-user"
          width={200}
          height={200}
        />
        <p>{dataUser.name}</p>
        <p>{dataUser.email}</p>
        <p>{dataUser.phoneNumber}</p>
        <p>{dataUser.role}</p>
        <p>{dataUser.date}</p>
      </Layout>
    </>
  );
}
