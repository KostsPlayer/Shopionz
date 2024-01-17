import express from "express";
import supabase from "../config/supabase.js";
import configureMiddleware from "../config/middleware.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.put("/update-menu/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const { name, icon, url, is_active } = req.body;

    const { data, error } = await supabase
      .from("menu")
      .update({ name: name, icon: icon, url: url, is_active: is_active })
      .eq("id", menuId)
      .select("*");

    if (error) {
      return res.json(error.message);
    }

    return res.json({ data, message: "Update menu successfully!" });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/insert-menu", async (req, res) => {
  try {
    const { name, icon, url, is_active } = req.body;

    const { data, error } = await supabase
      .from("menu")
      .insert({ name: name, icon: icon, url: url, is_active: is_active })
      .select("*");

    if (error) {
      return res.json(error.message);
    }

    return res.json({ data, message: "Insert Menu successfully!" });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/menu", async (req, res) => {
  try {
    const { data, error } = await supabase.from("menu").select("*").order("id");

    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/get-menu/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const { data, error } = await supabase
      .from("menu")
      .select("*")
      .eq("id", menuId);

    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/delete-menu/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const { data, error } = await supabase
      .from("menu")
      .delete()
      .eq("id", menuId);

    if (error) {
      return res.json(error.message);
    }

    return res.json({ data, message: "Delete menu successfully" });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
