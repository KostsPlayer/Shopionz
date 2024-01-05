import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Profile() {
  axios.defaults.withCredentials = true;
  const [dataUser, setDataUser] = useState([]);

  const getLocalStorage = JSON.parse(localStorage.getItem("dataUser"));
  const getImageUrl = JSON.parse(localStorage.getItem("imageUrl"));

  useEffect(() => {
    const getDate = moment(getLocalStorage.dataUser.date_available);
    const customDate = getDate.format("dddd, D MMMM YYYY");

    setDataUser({
      name: getLocalStorage.dataUser.name,
      email: getLocalStorage.dataUser.email,
      phoneNumber: getLocalStorage.dataUser.phone_number,
      role: getLocalStorage.dataUser.roles.roles,
      date: customDate,
      images: getImageUrl.imageUrl.publicUrl,
    });
  }, [getLocalStorage, getImageUrl]);

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
        <p>Name : {dataUser.name}</p>
        <p>Email : {dataUser.email}</p>
        <p>Phone Number : {dataUser.phoneNumber}</p>
        <p>Role : {dataUser.role}</p>
        <p>Date Registered : {dataUser.date}</p>
        <p>
          Address : <Link to={"/address"}>Add New Address</Link>
        </p>
      </Layout>
    </>
  );
}
