import express from "express";
import configureMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";
import multer from "multer";

const app = express();
configureMiddleware(app);
const router = express.Router();

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

    // let imageData = {};
    let dataImage;
    if (image) {
      const { data, error } = await supabase.storage
        .from("Images")
        .upload(`/${image.originalname}`, image.buffer, {
          upsert: true,
        });

      if (error) {
        return res.json(error);
      }

      return (dataImage = data);
      // imageData = { image: data.path };
    }

    // const updatedFields = {};
    // if (name) updatedFields.name = name;
    // if (email) updatedFields.email = email;
    // if (phone_number) updatedFields.phone_number = phone_number;

    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .update({
        name: name,
        email: email,
        phone_number: phone_number,
        image: dataImage.path,
        // ...updatedFields,
        // ...imageData,
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
      imageData,
    });
  } catch (error) {
    return res.json(error);
  }
});

export default router;
