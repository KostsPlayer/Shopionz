import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const configureMiddleware = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["https://shopionz.vercel.app"],
      methods: ["GET", "POST", "PUT", "OPTIONS"],
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      key: "shopionzUser",
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );
};

export default configureMiddleware;
