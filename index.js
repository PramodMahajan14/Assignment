const express = require("express");
const app = express();
// require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use("/v1/api", require("./Routes/control"));

app.listen(PORT, () => {
  console.log("Running server on PORT ", PORT);
});
