import express from "express";
import configureMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";
import { verifyToken } from "../config/verifyToken.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/count-cart/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;

    const { count, error } = await supabase
      .from("shopping_cart")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) {
      return res.json(error);
    }

    return res.json(count);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/cart/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from("shopping_cart")
      .select(`*, product (*)`)
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

router.post("/insert-cart", verifyToken, async (req, res) => {
  try {
    const { product_id, amount, userId } = req.body;
    const active = 1;

    const { data, error } = await supabase
      .from("shopping_cart")
      .insert({
        user_id: userId,
        product_id: product_id,
        amount: amount,
        status: active,
      })
      .select("*");

    if (error) {
      return res.json(error);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/update-cart-amount/:id", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const cartId = req.params.id;

    const { data, error } = await supabase
      .from("shopping_cart")
      .update({
        amount: amount,
      })
      .eq("id", cartId)
      .select("*");

    if (error) {
      return res.json(error);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/update-cart-status/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const cartId = req.params.id;

    const { data, error } = await supabase
      .from("shopping_cart")
      .update({
        status: status,
      })
      .eq("id", cartId)
      .select("*");

    if (error) {
      return res.json(error);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/delete-cart/:id", verifyToken, async (req, res) => {
  try {
    const cartId = req.params.id;

    const { data, error } = await supabase
      .from("shopping_cart")
      .delete()
      .eq("id", cartId);

    if (error) {
      return res.json(error);
    }

    return res.json({ data, message: "Delete cart item successfully!" });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
