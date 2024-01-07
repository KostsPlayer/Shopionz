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
    const { name, email, phone_number } = req.body;
    const image = req.file;

    let imageData = {};
    if (image) {
      const { data, error } = await supabase.storage
        .from("Images")
        .upload(`/${image.originalname}`, image.buffer, {
          upsert: true,
        });

      if (error) {
        return res.json(error);
      }

      imageData = { image: data.path };
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (phone_number) updatedFields.phone_number = phone_number;

    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .update({
        ...updatedFields,
        ...imageData,
      })
      .eq("id", userId)
      .select("*, roles(*)");

    const url = supabase.storage
      .from("Images")
      .getPublicUrl(profileData[0].image);
    const imageUrl = url.data;

    if (profileError) {
      return res.json(profileError);
    }

    return res.json({
      dataUser: profileData[0],
      message: "Updated profile successfully!",
      imageUrl: imageUrl,
    });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
