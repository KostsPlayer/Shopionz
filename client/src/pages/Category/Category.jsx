import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";

export default function Category() {
  useEffect(() => {
    axios
      .get("https://project-ii-server.vercel.app/get-category")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Layout>
        <h1>Hello World!</h1>
      </Layout>
    </>
  );
}
