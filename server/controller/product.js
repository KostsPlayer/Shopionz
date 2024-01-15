import express from "express";
import configureMiddleware from "../config/middleware.js";
import supabase from "../config/supabase.js";
import multer from "multer";

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/category", async (req, res) => {
  try {
    const { data, error } = await supabase.from("category").select("*");

    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/product", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("product")
      .select(`*, category(*)`);

    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/product-seller/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from("product")
      .select(`*, category(*)`)
      .eq("user_id", userId);

    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/get-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const { data, error } = await supabase
      .from("product")
      .select(`*, category(*)`)
      .eq("id", productId);

    if (error) {
      return res.json(error.message);
    }

    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/insert-product/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const image = req.file;
    const userId = req.params.id;

    const { data: imageData, error: imageError } = await supabase.storage
      .from("Images")
      .upload(`/${image.originalname}`, image.buffer);

    if (imageError) {
      res.json(imageError.message);
      res.json(imageError.stack);
      res.json(imageError.name);
    }

    const { data: productData, error: productError } = await supabase
      .from("product")
      .insert({
        user_id: userId,
        name: name,
        description: description,
        price: price,
        stock: stock,
        category_id: category,
        images: imageData.path,
      })
      .select("*");

    if (productError) {
      res.json(productError.message);
      res.json(productError.code);
      res.json(productError.details);
      res.json(productError.hint);
    }

    return res.json({
      data: productData[0],
      message: "Insert product successfully!",
      imageData: imageData,
    });
  } catch (error) {
    return res.json(error);
  }
});

// router.put("/update-product/:id", async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const { name, description, price, stock, category } = req.body;
//     const image = req.file.filename;

//     const { data, error } = await supabase
//       .from("product")
//       .update({
//         name: name,
//         description: description,
//         price: price,
//         stock: stock,
//         category_id: category,
//         images: image,
//       })
//       .eq("id", productId)
//       .select("*");

//     if (error) {
//       return res.json(error.message);
//     }

//     return res.json({ data, message: "Update product successfully!" });
//   } catch (error) {
//     return res.json(error);
//   }
// });

router.put("/delete-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const image = req.body;

    const { data: dataImage, error: errorImage } = await supabase.storage
      .from("Images")
      .remove([`/${image}`]);

    if (errorImage) {
      return res.json(errorImage.message);
    }

    const { data: dataProduct, error: errorProduct } = await supabase
      .from("product")
      .delete()
      .eq("id", productId);

    if (errorProduct) {
      return res.json(errorProduct.message);
    }

    return res.json({
      data: dataProduct,
      message: "Delete product successfully!",
      dataImage: dataImage,
    });
  } catch (error) {
    return res.json(error);
  }
});

export default router;

// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     const { data, error } = await supabase.storage
//       .from("Images")
//       .upload(pathStorage, file);

//     if (error) {
//       cb(error.message);
//       cb(error.name);
//       cb(error.stack);
//     }

//     cb(null, data.path);
//     console.log(pathStorage);
//     console.log(file);
//   },
// });
// const upload = multer({ storage });
