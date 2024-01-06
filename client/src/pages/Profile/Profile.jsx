import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
moment.locale("id");

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
        <div className="profile">
          <img
            src={dataUser.images}
            alt="profile-user"
            className="profile-image"
            width={200}
            height={200}
          />
          <div className="profile-desc">
            <p>Name : {dataUser.name}</p>
            <p>Email : {dataUser.email}</p>
            <p>Phone Number : {dataUser.phoneNumber}</p>
            <p>Role : {dataUser.role}</p>
            <p>Date Registered : {dataUser.date}</p>
          </div>
          <div className="profile-address">
            {dataAddress.map(
              ({ address, villages, districts, regencies, provincies }) => (
                <p>
                  Address : {address}, {villages}, {districts}, {regencies},{" "}
                  {provincies}
                </p>
              )
            )}
            <Link to={"/address"}>Add New Address</Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
