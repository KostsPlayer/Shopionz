import React, { useEffect, useState } from "react";
import axios from "axios";
import { validationMenu, allMessage } from "../../component/Helper/LogicServer";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function InsertMenu({ onOpen, onClose, title }) {
  axios.defaults.withCredentials = true;
  if (!onOpen) return null;
  const { toastMessage, message } = allMessage();
  const [isActice, setIsActive] = useState(false);
  const [values, setValues] = useState({
    name: "",
    icon: "",
    url: "",
    is_active: isActice,
  });

  const getToken = localStorage.getItem("token");
  const decodedToken = JSON.parse(getToken);

  const handleChange = (e) => {
    setIsActive(!isActice);

    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues({ ...values, [e.target.name]: newValue });
  };

  useEffect(() => {
    console.log(getToken);
    console.log(decodedToken);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    validationMenu
      .validate(values, { abortEarly: false })
      .then(() => {
        axios
          .post("https://project-ii-server.vercel.app/insert-menu", values, {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((res) => {
            toastMessage("success", res.data.message);
            console.log(res.data);
            console.log(values);
          })
          .catch((err) => {
            console.log(err);
            toastMessage("error", err.message);
          });
      })
      .catch((errors) => {
        const errorMessages = errors.inner.map((error) => (
          <li key={error.path}>{error.message}</li>
        ));
        toastMessage(
          "error",
          <ul className="error-message">{errorMessages}</ul>,
          "top-center"
        );
      });
  };

  return (
    <>
      <div className={`overlay-modal`} onClick={onClose}>
        <div
          className={`modal-area`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1>{title}</h1>
          <span onClick={onClose} className="material-symbols-outlined">
            close
          </span>
          <form className="form-modal-area" onSubmit={handleSubmit}>
            <div className="form-modal-area-row">
              <label htmlFor="name" className="form-label">
                Menu Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={values.name}
              />
            </div>
            <div className="form-modal-area-row">
              <label htmlFor="icon" className="form-label">
                Menu Icon
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="icon"
                name="icon"
                className="form-input"
                value={values.icon}
              />
            </div>
            <div className="form-modal-area-row">
              <label htmlFor="url" className="form-label">
                Menu Url
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="url"
                name="url"
                className="form-input"
                value={values.url}
              />
            </div>
            <div className="form-modal-area-row">
              <label htmlFor="is_active" className="form-label">
                Active?
              </label>
              <input
                onChange={handleChange}
                checked={values.is_active}
                type="checkbox"
                id="is_active"
                name="is_active"
                className="form-checked"
              />
            </div>
            <button type="submit" className="form-submit">
              Add Menu
            </button>
          </form>
        </div>
      </div>
      {message && <ToastContainer />}
    </>
  );
}
