import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cursor from "../../component/Helper/Cursor";
import Navbar from "../../component/Navbar/Navbar";

export default function ProductId() {
  axios.defaults.withCredentials = true;
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const redirect = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/get-product/${id}`)
      .then((res) => {
        setData(res.data[0]);
        // console.log(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });

    console.log(isValid);
  }, [id]);

  useEffect(() => {
    setTotalPrice(data.price * quantity);
  }, [data.price, quantity]);

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

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (isValid === false) {
      redirect("/login");
    }

    axios
      .get("http://localhost:5001/api/session")
      .then((res) => {
        if (res.data.isValid === true) {
          setIsValid(true);
        }

        if (isValid === true) {
          const valuesCart = {
            product_id: data.id,
            amount: quantity,
          };

          axios
            .post("http://localhost:5001/api/insert-cart", valuesCart)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleBuyNow = () => {
    redirect(`/order/${id}`);
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
            src={`/src/assets/product/${data.images}`}
            alt={data.name}
            width={200}
            height={200}
          />
        </div>
        <div className="product-id-detail">
          <p>Nama: {data.name}</p>
          <p>Harga: {data.price}</p>
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
    </>
  );
}
