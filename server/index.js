import express from "express";
import configureMiddleware from "./config/middleware.js";
import signupRouter from "./controller/signup.js";
import loginRouter from "./controller/login.js";
import roleRouter from "./controller/roles.js";
import menuRouter from "./controller/menu.js";
import productRouter from "./controller/product.js";
import cartRouter from "./controller/cart.js";
import orderRouter from "./controller/order.js";
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

app.get("/session", (req, res) => {
  const user = localStorage.getItem("dataUser");

  if (!user) {
    return res.json({ isValid: false, user: user });
  } else {
    return res.json({ isValid: true, user: user, data });
  }
});

app.post("/logout", (req, res) => {
  localStorage.removeItem("dataUser");
  return res.json({ message: "Logged out successfully!" });
});

const port = process.env.REACT_APP_PORT || 5001;
app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
