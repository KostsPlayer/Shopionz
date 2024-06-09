import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }

    // Jika token valid, simpan informasi pengguna ke dalam request
    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  });
};
