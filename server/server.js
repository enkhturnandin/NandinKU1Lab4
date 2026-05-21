const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes=require("./routes/auth");

const app=express();

app.use(cors());
app.use(express.json());

app.use("/auth",authRoutes);

app.use(express.static(path.join(__dirname, "../client")));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});