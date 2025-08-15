const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.js");
const { readdirSync } = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Load all routes dynamically
const routesPath = path.join(__dirname, "routes");
readdirSync(routesPath).forEach((file) => {
    const route = require(path.join(routesPath, file));

    if (route && typeof route === "function") {
        // If the file exports a function (Router)
        app.use("/api/v1", route);
    } else if (route && route.router) {
        // If the file exports { router: router }
        app.use("/api/v1", route.router);
    } else {
        console.warn(`Route file ${file} does not export a valid router.`);
    }
});

connectDB()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
