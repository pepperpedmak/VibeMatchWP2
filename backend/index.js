const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const con = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


