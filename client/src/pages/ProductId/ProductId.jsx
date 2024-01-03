import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cursor from "../../component/Helper/Cursor";
import Navbar from "../../component/Navbar/Navbar";
import { allMessage } from "../../component/Helper/LogicServer";
import { ToastContainer } from "react-toastify";

export default function ProductId() {
  axios.defaults.withCredentials = true;
  const { id } = useParams();
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const redirect = useNavigate();
  const { message, toastMessage } = allMessage();

  useEffect(() => {
    axios
      .get(`https://project-ii-server.vercel.app/get-product/${id}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const newPrice = Math.round(data.price + data.price * (15 / 100));

  useEffect(() => {
    setTotalPrice(newPrice * quantity);
  }, [newPrice, quantity]);

  const handleRemoveClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddClick = () => {
    if (quantity < data.stock) {
      setQuantity(quantity + 1);
    }
  };

  const getEmail = JSON.parse(localStorage.getItem("dataUser"));

  const handleAddToCart = (e) => {
    if (!getEmail.dataUser) {
      toastMessage("warn", "You must login first to add product on cart!");
    }

    const email = getEmail.dataUser.email;
    e.preventDefault();

    const valuesCart = {
      product_id: data.id,
      amount: quantity,
      email: email,
    };

    axios
      .post("https://project-ii-server.vercel.app/insert-cart", valuesCart)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBuyNow = () => {
    if (!getEmail.dataUser) {
      toastMessage("warn", "You must login first to buy some product!");
    }

    redirect(`/order/${id}`, {
      replace: true,
      state: { quantity, totalPrice },
    });
  };

  return (
    <>
      <Cursor />
      <Navbar />
      <span
        className="material-symbols-outlined"
        onClick={() => {
          window.history.back();
        }}
      >
        arrow_back
      </span>
      <div className="product-id">
        <div className="product-id-image">
          <img
            src={`https://crijtkbvmmpjdbxqqkpi.supabase.co/storage/v1/object/public/Images/${data.images}`}
            alt={data.name}
            width={200}
            height={200}
          />
        </div>
        <div className="product-id-detail">
          <p>Nama: {data.name}</p>
          <p>Harga: {newPrice}</p>
          <p>Stock: {data.stock}</p>
          <p>Category: {data.category_name}</p>
          <div className="product-id-count">
            <span
              className="material-symbols-outlined"
              onClick={handleRemoveClick}
            >
              remove
            </span>
            <p>{quantity}</p>
            <span
              className="material-symbols-outlined"
              onClick={handleAddClick}
            >
              add
            </span>
          </div>
          <p>Total Price : {totalPrice}</p>
          <button onClick={handleAddToCart}>Keranjang</button>
          <button onClick={handleBuyNow}>Beli</button>
        </div>
      </div>
      {message && <ToastContainer />}
    </>
  );
}
