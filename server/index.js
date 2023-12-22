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

// Contoh penggunaan try-catch di endpoint "/session"
app.get("/api/session", (req, res) => {
  const user = req.session.user[0];

  if (!user) {
    res.json({ isValid: false, user: user });
  } else {
    res.json({ isValid: true, user: user });
  }
});

app.get("/api/users", (req, res) => {
  const user = req.session.user[0];

  const image = user.image;
  const name = user.name;
  const email = user.email;

  res.json({
    image: image,
    name: name,
    email: email,
  });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("shopionzUser");
  res.json({ message: "Logged out successfully!" });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://project-ii-one.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const port = process.env.REACT_APP_PORT || 5001;
app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
