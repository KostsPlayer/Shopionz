import express from "express";
import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";
import configureMiddleware from "../config/middleware.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.post("/login", async (req, res) => {
  const { usernameEmail, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .or(`name.eq.${usernameEmail}, email.eq.${usernameEmail}`);

    if (error) {
      res.json(error.message);
    }

    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (error, response) => {
        if (error) {
          res.json(error.message);
        }

        const url = supabase.storage.from("Images").getPublicUrl(data[0].image);

        const imageUrl = url.data;

        if (response) {
          return res.json({
            message: `Welcome to Shopionz, ${data[0].name}`,
            loggedIn: true,
            role: data[0].role_id,
            dataUser: data[0],
            imageUrl: imageUrl,
            isValid: true,
          });
        } else {
          return res.json({
            message: "Wrong username/email or password combination!",
            loggedIn: false,
            isValid: false,
          });
        }
      });
    } else {
      return res.json({ loggedIn: false, message: "User doesn't exist" });
    }
  } catch (error) {
    return res.json(error);
  }
});

export default router;
