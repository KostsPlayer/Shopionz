import React, { useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar/Sidebar";
import Topbar from "../Layout/Topbar/Topbar";
import Cursor from "../../component/Helper/Cursor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const redirect = useNavigate();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    axios
      .get("https://project-ii-server.vercel.app/api/session", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.isValid === true) {
          setIsValid(true);
        } else {
          localStorage.setItem(
            "dashboardAccess",
            "You do not have access to the dashboard page!!"
          );
          setIsValid(false);
          redirect("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        setIsValid(false);
        redirect("/login");
      });
  }, []);

  return (
    <>
      {isValid && (
        <>
          <Cursor />
          <div className="layout">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="topbar">
              <Topbar />
            </div>
            <div className="content">{children}</div>
          </div>
        </>
      )}
    </>
  );
}
