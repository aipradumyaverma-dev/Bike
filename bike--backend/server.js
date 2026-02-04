 require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bikeRoutes = require("./routes/routes");
const path = require('path');
const cors = require("cors");
const app = express();

// ★★★ VERY IMPORTANT ★★★
// DO NOT use express.json() globally when handling file uploads
// app.use(express.json());   ← REMOVE or COMMENT THIS LINE

connectDB();
app.use(cors());
app.use(express.json());


// Serve uploaded images statically (very useful!)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api", bikeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);