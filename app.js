const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 5000;

// routes
const rutasLogin = require("./routes/api/login");
const routes = require("./routes/api/rutas");

const app = express();

//Connect Database
connectDB();

//cors
app.use(cors({ origin: true, credentials: true }));

//init Middleware
app.use(express.json({ extended: false }));

//use Routes
app.use("/api", routes, rutasLogin);

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
