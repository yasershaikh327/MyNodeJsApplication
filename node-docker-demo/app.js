const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Docker + Easypanel 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://0.0.0.0:3000");
});

