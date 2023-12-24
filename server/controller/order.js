import express from "express";
import configureMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/get-payment", async (req, res) => {
  try {
    const { data, error } = await supabase.from("payment_method").select("*");

    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/get-shipping", async (req, res) => {
  try {
    const { data, error } = await supabase.from("shipping_method").select("*");

    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.post("/insert-order", async (req, res) => {
  try {
    const {
      shippingMethod,
      paymentMethod,
      address,
      phoneNumber,
      amount,
      productId,
    } = req.body;
    const getLocalStorage = localStorage.getItem("dataUser");
    const userId = getLocalStorage.id;

    const { data: order, error: errorOrder } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
      })
      .select("*");

    if (errorOrder) {
      return res.json(errorOrder.message);
    }

    const orderId = order[0].id;

    const { data: orderDetail, error: errorOrderDetail } = await supabase
      .from("orders_detail")
      .insert([
        {
          orders_id: orderId,
          product_id: productId,
          amount: amount,
          address: address,
          phone_number: phoneNumber,
          shipping_method_id: shippingMethod,
          payment_method_id: paymentMethod,
        },
      ])
      .select("*");

    if (errorOrderDetail) {
      return res.json(errorOrderDetail.message);
    }

    return res.json(orderDetail);
  } catch (error) {
    return res.json(error);
  }
});

export default router;
