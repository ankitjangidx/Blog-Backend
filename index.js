const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware to pass json request body
app.use(express.json());

const blog = require("./routes/blog");
app.use("/api/v1", blog);

// connect to database
const dbConnect = require("./config/database");
dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
