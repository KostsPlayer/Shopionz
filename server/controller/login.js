import express from "express";
import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";
import configureMiddleware from "../config/middleware.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.post("/api/login", async (req, res) => {
  const { usernameEmail, password } = req.body;

  try {
    const { data, err } = await supabase
      .from("users")
      .select("*")
      .or(`name.eq.${usernameEmail}, email.eq.${usernameEmail}`);

    if (err) {
      console.error(err);
    }

    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (error, response) => {
        if (error) {
          res.json(error);
        }

        if (response) {
          req.session.user = data;
          res.json({
            message: `Welcome to Shopionz, ${data[0].name}`,
            loggedIn: true,
            role: data[0].role_id,
          });
        } else {
          res.json({
            message: "Wrong username/email or password combination!",
            loggedIn: false,
          });
        }
      });
    } else {
      res.json({ loggedIn: false, message: "User doesn't exist" });
    }
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
