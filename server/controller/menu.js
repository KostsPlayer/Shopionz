import express from "express";
import supabase from "../config/supabase.js";
import configureMiddleware from "../config/middleware.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/menu", async (req, res) => {
  try {
    const { data, error } = await supabase.from("menu").select("*");

    if (error) {
      console.error(error);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
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
      console.log(error);
    }

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/update-menu/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const { name, icon, url, is_active } = req.body;

    const { data, error } = await supabase
      .from("menu")
      .update([{ name: name, icon: icon, url: url, is_active: is_active }])
      .eq("id", menuId)
      .select("*");

    if (error) {
      res.json(error.message);
    }

    res.json({ data, message: "Update menu successfully!" });
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/insert-menu", async (req, res) => {
  try {
    const { name, icon, url, is_active } = req.body;

    const { data, error } = await supabase
      .from("menu")
      .insert([{ name: name, icon: icon, url: url, is_active: is_active }])
      .select("*");

    if (error) {
      res.json(error.message);
    }

    res.json({ data, message: "Insert Menu successfully!" });
  } catch (error) {
    console.error(error.message);
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
      res.json(error.message);
    }

    res.json({ data, message: "Delete menu successfully" });
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
