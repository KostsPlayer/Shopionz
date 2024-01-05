import express from "express";
import configureMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";

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
    const { provinces, regencies, districts, villages, address, userId } =
      req.body;

    const { data, error } = await supabase
      .from("addresses")
      .insert({
        provinces: provinces,
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

export default router;