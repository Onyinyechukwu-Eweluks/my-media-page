const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "User not logged in" });
  try {
    const validToken = verify(accessToken, "importantSecret");
    //setting a req variable called user
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ message: "Invalid user", error: err });
  }
};

module.exports = { validateToken };
