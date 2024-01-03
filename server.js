//include packages
const express = require("express");
const app = express();
app.use(express.static("dist"));

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Started on http://localhost:${PORT}`);
});