import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";

export default function History() {
  axios.defaults.withCredentials = true;

  const getLocalStorage = JSON.parse(localStorage.getItem("dataUser"));
  const [history, setHistory] = useState([]);
  let no = 1;

  useEffect(() => {
    axios
      .get(
        `https://project-ii-server.vercel.app/history/${getLocalStorage.dataUser.id}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [getLocalStorage]);
  
  return (
    <>
      <Layout>
        <h1>Hello World!</h1>
        <div className="delete">
          <div className="bagde-icon">
            <span className="material-symbols-outlined">delete</span>
          </div>
        </div>
        <table className="table-menu">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Icon</th>
              <th>Activate</th>
              <th>Date Available</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{no++}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </Layout>
    </>
  );
}
