const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");
const connectDB = require("./config/dbConnection.js");
const cors = require("cors");
const app = express();

connectDB();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.get("/", (req, res) => res.end("hi"));

app.listen(port, () => console.log("Server is running on port " + port));
