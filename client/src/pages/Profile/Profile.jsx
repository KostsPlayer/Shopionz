import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { allMessage } from "../../component/Helper/LogicServer";
import { ToastContainer } from "react-toastify";
import moment from "moment";
moment.locale("id");

export default function Profile() {
  axios.defaults.withCredentials = true;
  const [dataUser, setDataUser] = useState([]);
  const [dataAddress, setDataAddress] = useState([]);
  const [values, setValues] = useState({});
  const getLocalStorage = JSON.parse(localStorage.getItem("dataUser"));
  const getImageUrl = JSON.parse(localStorage.getItem("imageUrl"));
  const { message, toastMessage } = allMessage();

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
      username: getLocalStorage.dataUser.name,
      email: getLocalStorage.dataUser.email,
      phoneNumber: getLocalStorage.dataUser.phone_number,
      role: getLocalStorage.dataUser.roles.roles,
      date: customDate,
      images: getImageUrl.imageUrl.publicUrl,
      imageProfile: getLocalStorage.dataUser.image,
    });
  }, [getLocalStorage, getImageUrl]);

  useEffect(() => {
    axios
      .get(
        `https://project-ii-server.vercel.app/profile/${getLocalStorage.dataUser.id}`
      )
      .then((res) => {
        console.log(res.data[0]);
        setValues(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setValues({ ...values, [e.target.name]: e.target.files });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleDeleteAddress = (id) => {
    axios
      .put(`https://project-ii-server.vercel.app/delete-address/${id}`)
      .then((res) => {
        toastMessage("success", "Delete address successfully!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <>
      <Layout>
        <div className="profile">
          <div className="profile-image">
            <img src={dataUser.images} alt="profile-user" />
            <label htmlFor="image" className="profile-image-label">
              <input
                type="file"
                name="image"
                id="image"
                value={dataUser?.imageProfile || ""}
                onChange={handleChange}
              />
              Select Image
            </label>
          </div>
          <div className="profile-desc">
            <div className="profile-desc-row">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={dataUser?.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profile-desc-row">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={dataUser?.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profile-desc-row">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                value={dataUser?.phoneNumber || ""}
                onChange={handleChange}
              />
            </div>
            <div className="profile-desc-row">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                name="role"
                id="role"
                value={dataUser.role}
                disabled
              />
            </div>
            <div className="profile-desc-row">
              <label htmlFor="date">Registered since</label>
              <input
                type="text"
                name="date"
                id="date"
                value={dataUser.date}
                disabled
              />
            </div>
          </div>
          <div className="profile-address">
            <Link className="profile-address-add" to={"/address"}>
              Add New Address
              <span class="material-symbols-outlined">add_circle</span>
            </Link>
            {dataAddress.map(
              ({ id, address, villages, districts, regencies, provincies }) => (
                <div className="profile-address-item">
                  <div className="column-left">
                    {address}, {villages}, {districts}, {regencies},{" "}
                    {provincies}
                  </div>
                  <div className="column-right">
                    <div className="icon">
                      <div
                        className="delete"
                        onClick={() => handleDeleteAddress(id)}
                      >
                        <div className="bagde-icon">
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </div>
                      </div>
                      <div className="edit">
                        <div className="bagde-icon">
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="set-main">Set Main Address</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        {message && <ToastContainer />}
      </Layout>
    </>
  );
}
