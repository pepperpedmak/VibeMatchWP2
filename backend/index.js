const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
const lifeStyleRoutes = require("./routes/lifeStyleRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userLifeStyleRoutes = require("./routes/userLifeStyleRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/user" , userRoutes);
app.use("/match" , matchRoutes);
app.use("/lifeStyle" , lifeStyleRoutes);
app.use("/category" , categoryRoutes);
app.use("/userlifestyle" , userLifeStyleRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
