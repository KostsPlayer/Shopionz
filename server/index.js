import express from "express";
import configureMiddleware from "./config/middleware.js";
import menuRouter from "./controller/menu.js";
import productRouter from "./controller/product.js";
import cartRouter from "./controller/cart.js";
import orderRouter from "./controller/order.js";
import userRouter from "./controller/users.js";
import categoryRouter from "./controller/category.js";
import addressesRouter from "./controller/addresses.js";
import authRouter from "./controller/auth.js";
import swaggerui from "swagger-ui-express";
import jsonFile from "yamljs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
configureMiddleware(app);

const swaggerAPI = jsonFile.load("./config/swagger.json");

app.use(menuRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(addressesRouter);
app.use(authRouter);

app.use("/swagger-docs", swaggerui.serve, swaggerui.setup(swaggerAPI));

const port = process.env.APP_PORT || 5001;
app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
