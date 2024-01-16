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
      userId,
    } = req.body;

    const { data: order, error: errorOrder } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        product_id: productId,
        amount: amount,
        address: address,
        phone_number: phoneNumber,
        shipping_method_id: shippingMethod,
        payment_method_id: paymentMethod,
      })
      .select("*");

    const { data: productData, error: productError } = await supabase
      .from("product")
      .select("*")
      .eq("id", productId);

    const updateStock = productData[0].stock - amount;

    const { data: stockData, error: stockError } = await supabase
      .from("product")
      .update({
        stock: updateStock,
      })
      .eq("id", productId)
      .select("*");

    if (errorOrder) {
      return res.json(errorOrder);
    }
    if (productError) {
      return res.json(productError);
    }
    if (stockError) {
      return res.json(stockError);
    }

    return res.json({
      message: "Order has been successfully placed!",
      order,
      stockData,
      productData,
    });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/history/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from("orders")
      .select("*, product(name), shipping_method(name), payment_method(name)")
      .eq("user_id", userId)
      .order("id");

    if (error) {
      return res.json(error);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/sales/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from("orders")
      .select("*, users(*), product(*), shipping_method(*), payment_method(*)")
      .eq("product.user_id", userId)
      .order("id");

    if (error) {
      return res.json(error);
    }

    const filteredData = data.filter((item) => item.product !== null);

    return res.json(filteredData);
  } catch (error) {
    return res.json(error);
  }
});

export default router;
