const axios = require("axios");

const blogData = async (req, res, next) => {
  try {
    const token = req.header("x-hasura-admin-secret");

    if (!token) return res.status(400).json({ msg: "Token Must Included" });
    const config = {
      headers: {
        "x-hasura-admin-secret": token,
      },
    };
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs ",
      config
    );

    req.data = response.data;

    next();
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = blogData;
