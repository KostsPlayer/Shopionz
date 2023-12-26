import express from "express";
import configureMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.post("/get-email", async (req, res) => {
  const { email } = req.body;

  
});

export default router;
