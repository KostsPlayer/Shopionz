import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { allMessage } from "../../component/Helper/LogicServer";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  const { message, toastMessage } = allMessage();

  useEffect(() => {
    const loginMessage = localStorage.getItem("loginMessage");

    if (loginMessage) {
      toastMessage("success", loginMessage);
      localStorage.removeItem("loginMessage");
    }
  }, []);

  return (
    <>
      <Layout>
        <h1 className="test-dasshboard">Hello Worlr!</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
          veritatis modi iusto rem! Praesentium neque consectetur quibusdam nemo
          sit iste vero pariatur beatae deleniti maxime, itaque, necessitatibus
          veritatis quasi ex.
        </p>
        {message && <ToastContainer />}
      </Layout>
    </>
  );
}
