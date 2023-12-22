import React, { useEffect, useState } from "react";
import InsertMenu from "./InsertMenu";
import UpdateMenu from "./UpdateMenu";
import Layout from "../Layout/Layout";
import axios from "axios";
import { allMessage } from "../../component/Helper/LogicServer";
import { ToastContainer } from "react-toastify";

export default function Menu() {
  axios.defaults.withCredentials = true;
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [dataMenu, setDataMenu] = useState([]);
  const [getId, setGetId] = useState(0);
  let no = 1;

  const { toastMessage, message } = allMessage();

  const handleMenu = (menuId) => {
    axios
      .get(`http://localhost:5001/api/get-menu/${menuId}`)
      .then((res) => {
        setGetId(res.data[0].id);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .put(`http://localhost:5001/api/delete-menu/${id}`)
      .then((res) => {
        toastMessage("success", res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fecthDataMenu = () => {
    axios
      .get("http://localhost:5001/api/menu")
      .then((res) => {
        setDataMenu(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fecthDataMenu();
  }, [getId, dataMenu]);

  return (
    <>
      <Layout>
        <span
          className="material-symbols-outlined"
          onClick={() => {
            setOpenInsertModal(true);
          }}
        >
          add
        </span>

        <InsertMenu
          onOpen={openInsertModal}
          onClose={() => {
            setOpenInsertModal(false);
          }}
          title={"Insert Menu"}
        />

        <UpdateMenu
          onOpen={openUpdateModal}
          onClose={() => {
            setOpenUpdateModal(false);
          }}
          menuId={getId}
          title={"Update Menu"}
        />

        <table className="table-menu">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Icon</th>
              <th>Activate</th>
              <th>Date Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataMenu.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{no++}</td>
                  <td>{data.name}</td>
                  <td>{data.icon}</td>
                  <td>{data.is_active}</td>
                  <td>{data.date_available}</td>
                  <td>
                    <div className="edit">
                      <div
                        className="bagde-icon"
                        onClick={() => {
                          setOpenUpdateModal(true);
                          handleMenu(data.id);
                        }}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </div>
                    </div>
                    <div className="delete">
                      <div
                        className="bagde-icon"
                        onClick={() => handleDelete(data.id)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {message && <ToastContainer />}
      </Layout>
    </>
  );
}
