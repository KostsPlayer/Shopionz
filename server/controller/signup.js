import express from "express";
import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";
import configureMiddleware from "../config/middleware.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.post("/registration", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const saltRound = 10;
    const hash = await bcrypt.hash(password, saltRound);

    const { data, error } = await supabase
      .from("users")
      .insert([{ name: username, email: email, password: hash }])
      .select("*");

    if (error) {
      res.json(error.message);
    }

    const userId = data[0].id;
    res.json({ success: true, userId: userId });
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
