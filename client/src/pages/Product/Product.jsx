import React, { useEffect, useState } from "react";
import Cursor from "../../component/Helper/Cursor";
import Navbar from "../../component/Navbar/Navbar";
import axios from "axios";

export default function Product() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Cursor />
      <div className="product">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Image</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <img src={`/src/assets/image/${user.image}`} />
                </td>
                <td>{user.date_available}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// fetch("/api/users")
//   .then((res) => res.json())
//   .then((data) => setData(data))
//   .catch((err) => console.log(err));
