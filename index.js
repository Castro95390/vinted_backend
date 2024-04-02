const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  try {
    console.log("hello");
    return res.status(200).json("Bienvenue sur Vinted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
app.use(userRoutes);
app.use(offerRoutes);

app.all("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(process.env.PORT, () => {
  console.log("C'est du serveur qui serveur");
});
