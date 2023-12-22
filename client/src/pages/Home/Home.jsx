import React from "react";
import Hero from "./Hero/Hero";
import Hotsale from "./Hotsale/Hotsale";
import Catalog from "./Catalog/Catalog";
import Cursor from "../../component/Helper/Cursor";
import SmoothScroll from "../../component/Helper/SmoothScroll";
import Navbar from "../../component/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <Hero />
      <Hotsale />
      <Catalog />
    </>
  );
}
