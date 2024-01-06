import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Profile() {
  axios.defaults.withCredentials = true;
  const [dataUser, setDataUser] = useState([]);
  const [dataAddress, setDataAddress] = useState([]);

  const getLocalStorage = JSON.parse(localStorage.getItem("dataUser"));
  const getImageUrl = JSON.parse(localStorage.getItem("imageUrl"));

  useEffect(() => {
    axios
      .get(
        `https://project-ii-server.vercel.app/get-address/${getLocalStorage.dataUser.id}`
      )
      .then((res) => {
        setDataAddress(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
        <span>Name : {dataUser.name}</span>
        <span>Email : {dataUser.email}</span>
        <span>Phone Number : {dataUser.phoneNumber}</span>
        <span>Role : {dataUser.role}</span>
        <span>Date Registered : {dataUser.date}</span>
        <span>
          Address :
          {dataAddress.map(
            ({ address, villages, districts, regencies, provincies }) => (
              <p>
                {address}, {villages}, {districts}, {regencies}, {provincies}
              </p>
            )
          )}
          <Link to={"/address"}>Add New Address</Link>
        </span>
      </Layout>
    </>
  );
}
