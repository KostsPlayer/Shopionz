import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cursor from "../../component/Helper/Cursor";
import Navbar from "../../component/Navbar/Navbar";

export default function Order() {
  axios.defaults.withCredentials = true;
  const { id } = useParams();
  const [data, setData] = useState({});
  const [getPayment, setGetPayment] = useState([]);
  const [getShipping, setGetShipping] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [values, setValues] = useState({
    address: "",
    phoneNumber: "",
    paymentMethod: 1,
    shippingMethod: 1,
    amount: quantity,
    productId: id,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/get-product/${id}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  useEffect(() => {
    setTotalPrice(data.price * quantity);
  }, [data.price, quantity]);

  useEffect(() => {
    setValues({
      ...values,
      amount: quantity,
    });
  }, [quantity]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/get-payment")
      .then((res) => {
        setGetPayment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/get-shipping")
      .then((res) => {
        setGetShipping(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5001/api/insert-order", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
      <div className="order">
        <div className="order-image">
          <img
            src={`/src/assets/product/${data.images}`}
            alt={data.name}
            width={300}
            height={300}
          />
          <input
            type="text"
            placeholder="Adress"
            name="address"
            id="address"
            onChange={handleChange}
            value={values.address}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            id="phoneNumber"
            onChange={handleChange}
            value={values.phoneNumber}
          />
          <select
            name="paymentMethod"
            id="paymentMethod"
            onChange={handleChange}
            value={values.paymentMethod}
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            {getPayment.map((payment, index) => (
              <option key={index} value={payment.id}>
                {payment.name}
              </option>
            ))}
          </select>
          <select
            name="shippingMethod"
            id="shippingMethod"
            onChange={handleChange}
            value={values.shippingMethod}
          >
            <option value="" disabled>
              Select Shipping Method
            </option>
            {getShipping.map((shipping, index) => (
              <option key={index} value={shipping.id}>
                {shipping.name}
              </option>
            ))}
          </select>
        </div>
        <div className="order-detail">
          <p>Nama: {data.name}</p>
          <p>Harga: {data.price}</p>
          <p>Stock: {data.stock}</p>
          <p>Category: {data.category_name}</p>
          <div className="order-count">
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
          <button onClick={handleSubmit}>Beli</button>
        </div>
      </div>
    </>
  );
}
