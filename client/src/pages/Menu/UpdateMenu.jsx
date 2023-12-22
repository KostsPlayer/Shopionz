import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  allMessage,
  validationInsertMenu,
} from "../../component/Helper/LogicServer";
import { ToastContainer } from "react-toastify";

export default function UpdateMenu({ onOpen, onClose, menuId, title }) {
  axios.defaults.withCredentials = true;
  if (!onOpen) return null;
  const { toastMessage, message } = allMessage();
  const [isActice, setIsActive] = useState(false);
  const [getMenu, setGetMenu] = useState({});

  useEffect(() => {
    axios
      .get(`/api/get-menu/${menuId}`)
      .then((res) => {
        setGetMenu(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [menuId]);

  const handleChange = (e) => {
    setIsActive(!isActice);
    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setGetMenu({ ...getMenu, [e.target.name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validationInsertMenu
      .validate(getMenu, { abortEarly: false })
      .then(() => {
        axios
          .put(`/api/update-menu/${menuId}`, getMenu)
          .then((res) => {
            toastMessage("success", res.data.message);
          })
          .catch((err) => {
            console.log(err);
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
                value={getMenu?.name || ""}
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
                value={getMenu?.icon || ""}
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
                value={getMenu?.url || ""}
              />
            </div>
            <div className="form-modal-area-row">
              <label htmlFor="is_active" className="form-label">
                Active?
              </label>
              <input
                onChange={handleChange}
                type="checkbox"
                id="is_active"
                name="is_active"
                className="form-input"
                checked={getMenu?.is_active || ""}
              />
            </div>
            <button type="submit" className="form-submit">
              Update Menu
            </button>
          </form>
        </div>
      </div>
      {message && <ToastContainer />}
    </>
  );
}
