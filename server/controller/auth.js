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
      .insert({ name: username, email: email, password: hash })
      .select("*");

    if (error) {
      return res.json(error.message);
    }

    const userId = data[0].id;
    return res.json({ success: true, userId: userId, data });
  } catch (error) {
    return res.json(error);
  }
});

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

router.post("/login", async (req, res) => {
  const { usernameEmail, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*, roles(*)")
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
            dataUser: data[0],
            imageUrl: imageUrl,
            isValid: true,
            roles: data[0].roles.roles,
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
