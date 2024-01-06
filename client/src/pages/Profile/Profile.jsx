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

  const [values, setValues] = useState({
    username: "",
    email: "",
    phoneNumber: 0,
    images: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.type === "file") {
      setValues({ ...values, [e.target.name]: e.target.files });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <>
      <Layout>
        <div className="profile">
          <div className="profile image">
            <img src={dataUser.images} alt="profile-user" />
            <input
              type="file"
              name="image"
              id="image"
              files={dataUser.image}
              onChange={handleChange}
            />
          </div>
          <div className="profile-desc">
            <div className="profile-desc-row">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                value={dataUser.name}
              />
            </div>
            <div className="profile-desc-row">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={dataUser.email}
              />
            </div>
            <div className="profile-desc-row">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                onChange={handleChange}
                value={dataUser.phoneNumber}
              />
            </div>
            <p>Role : {dataUser.role}</p>
            <p>Date Registered : {dataUser.date}</p>
          </div>
          <div className="profile-address">
            {dataAddress.map(
              ({ address, villages, districts, regencies, provincies }) => (
                <p className="profile-address-item">
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
