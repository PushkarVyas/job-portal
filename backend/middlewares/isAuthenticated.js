import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.id = decode.userId; // ✅ FIXED

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

export default isAuthenticated;
