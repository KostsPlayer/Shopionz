import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const configureMiddleware = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      key: "shopionzUser",
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        maxAge: 2 * 60 * 60 * 1000,
      },
    })
  );
};

export default configureMiddleware;
