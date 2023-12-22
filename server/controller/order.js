import express from "express";
import configureMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/api/get-payment", async (req, res) => {
  try {
    const { data, error } = await supabase.from("payment_method").select("*");

    if (error) {
      res.json(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/api/get-shipping", async (req, res) => {
  try {
    const { data, error } = await supabase.from("shipping_method").select("*");

    if (error) {
      res.json(error.message);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/api/insert-order", async (req, res) => {
  try {
    const {
      shippingMethod,
      paymentMethod,
      address,
      phoneNumber,
      amount,
      productId,
    } = req.body;
    const userId = req.session.user[0].id;

    const { data: order, error: errorOrder } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
      })
      .select("*");

    if (errorOrder) {
      res.json(errorOrder.message);
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
      res.json(errorOrderDetail.message);
    }

    res.json(orderDetail);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
