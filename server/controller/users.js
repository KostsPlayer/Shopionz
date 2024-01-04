import express from "express";
import configureMiddleware from "../config/middleware.js";
// import supabase from "../config/supabase.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/provincies", (req, res) => {
  fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json`)
    .then((response) => response.json())
    .then((provinces) => res.json(provinces));
});

router.get("/regencies/:id", (req, res) => {
  const provinciesId = req.params.id;

  fetch(
    `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinciesId}.json`
  )
    .then((response) => response.json())
    .then((regencies) => res.json(regencies));
});

router.get("/districts/:id", (req, res) => {
  const regenciesId = req.params.id;

  fetch(
    `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${regenciesId}.json`
  )
    .then((response) => response.json())
    .then((districts) => res.json(districts));
});

router.get("/villages/:id", (req, res) => {
  const districtsId = req.params.id;

  fetch(
    `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${districtsId}.json`
  )
    .then((response) => response.json())
    .then((villages) => res.json(villages));
});

export default router;
