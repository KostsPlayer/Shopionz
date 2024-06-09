import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const getToken =
    process.env.JWT_TOKEN ||
    "gf0tzbRgE0kRy1e8Ye643dEEATVYIGFzBYx8oGGK79a6PQmcEPqSKaP06BJHMu6SwTKxE1pOTVGTvjUwKqFMc8WCmuofxX51zacleZ5utjU6TLYojmlqvQbBxDu0JtR845lmDEVlIcK6vIhmfUTlGe9ZJ0irhhEwxPlu8SWrzXk3Z1tpsadzYSlikXVQE3IHMrp0Q4ioCfuT4pouoYGIb1tgy7Dl7aoLAMPShBvyABhIB3Geedvy9dgVlHKAvk1a";

  jwt.verify(token, getToken, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }

    // Jika token valid, simpan informasi pengguna ke dalam request
    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  });
};
