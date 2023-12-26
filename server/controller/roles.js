import express from "express";
import supabase from "../config/supabase.js";
import configureMiddleware from "../config/middleware.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.post("/assign-role", async (req, res) => {
  try {
    const { userId, role } = req.body;

    let roleValue;
    
    if (role === "Seller") {
      roleValue = 2;
    } else {
      roleValue = 3;
    }

    const { data, error } = await supabase
      .from("users")
      .update({ role_id: roleValue })
      .eq("id", userId)
      .select("*");

    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

export default router;
