import express from "express";
import configureMiddleware from "./config/middleware.js";
import signupRouter from "./controller/signup.js";
import loginRouter from "./controller/login.js";
import roleRouter from "./controller/roles.js";
import menuRouter from "./controller/menu.js";
import productRouter from "./controller/product.js";
import cartRouter from "./controller/cart.js";
import orderRouter from "./controller/order.js";
import userRouter from "./controller/users.js";
import categoryRouter from "./controller/category.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
configureMiddleware(app);

app.use(loginRouter);
app.use(signupRouter);
app.use(roleRouter);
app.use(menuRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(categoryRouter);

const port = process.env.REACT_APP_PORT || 5001;
app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
