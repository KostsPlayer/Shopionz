import express from "express";
import configureMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";
import multer from "multer";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/provincies", async (req, res) => {
  try {
    await fetch(
      `https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json`
    )
      .then((response) => response.json())
      .then((provinces) => res.json(provinces));
  } catch (error) {
    return res.json(error);
  }
});

router.get("/regencies/:id", async (req, res) => {
  try {
    const provinciesId = req.params.id;

    await fetch(
      `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinciesId}.json`
    )
      .then((response) => response.json())
      .then((regencies) => res.json(regencies));
  } catch (error) {
    return res.json(error);
  }
});

router.get("/districts/:id", async (req, res) => {
  try {
    const regenciesId = req.params.id;

    await fetch(
      `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${regenciesId}.json`
    )
      .then((response) => response.json())
      .then((districts) => res.json(districts));
  } catch (error) {
    return res.json(error);
  }
});

router.get("/villages/:id", async (req, res) => {
  try {
    const districtsId = req.params.id;

    await fetch(
      `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${districtsId}.json`
    )
      .then((response) => response.json())
      .then((villages) => res.json(villages));
  } catch (error) {
    return res.json(error);
  }
});

router.post("/insert-address", async (req, res) => {
  try {
    const { provincies, regencies, districts, villages, address, userId } =
      req.body;

    const { data, error } = await supabase
      .from("addresses")
      .insert({
        provincies: provincies,
        regencies: regencies,
        districts: districts,
        villages: villages,
        address: address,
        user_id: userId,
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

router.get("/get-address/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return res.json(error);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/delete-address/:id", async (req, res) => {
  const addressId = req.params.id;

  try {
    const { data, error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", addressId);

    if (error) {
      return res.json(error);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId);

    if (error) {
      return res.json(error);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.put("/update-profile/:id", upload.single("image"), async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, phoneNumber } = req.body;
    const images = req.file;

    res.json("Request Body:", req.body);
    res.json("Request File:", req.file);

    const { data: imageData, error: imageError } = await supabase.storage
      .from("Images")
      .upload(`/${images.originalname}`, images.buffer);

    if (imageError) {
      return res.json(imageError);
    }

    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .update({
        name: username,
        email: email,
        phone_number: phoneNumber,
        image: imageData.path,
      })
      .eq("id", userId)
      .select("*");

    if (profileError) {
      return res.json(profileError);
    }

    return res.json({ profileData, imageData });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
