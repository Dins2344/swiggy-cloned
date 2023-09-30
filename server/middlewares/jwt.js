const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

module.exports = {
  jwtVerify: ( req,res,next) => {
    const token = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];

    if (token == "null") {
      return res
        .status(401)
        .json({ invalidToken: true, message: "Unauthorized" });
    }

    jwt.verify(token,secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(403)
          .json({ invalidToken: true, message: '"Forbidden', err });
      }
      req.user = decoded;
      next();
    });
  },

  tokenGenerator: (email) => {
    try {
      const accessToken = jwt.sign(
        {email },
        secretKey,
        // { expiresIn: "20s" }
      )
      return accessToken
    } catch (error) {
      throw new Error(error);
    }
  },
};
