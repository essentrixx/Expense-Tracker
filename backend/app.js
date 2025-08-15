const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.js");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(
    cors({
        origin: [
            'https://simple-expensive-tracker-klna.onrender.com', // Render frontend
            'http://localhost:5173' // local dev frontend
        ]
    })
);


// routes
readdirSync("./routes").map(route => app.use("/api/v1", require("./routes/" + route)));

// mongodb
connectDB()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error(err));

app.get("/", (req, res) => {
    res.send("index");
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));