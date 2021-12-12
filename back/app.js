const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
// Fichier de configuration
require("dotenv").config();

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Connexion à la base de donnée
mongoose
    .connect(process.env.APP_DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

// Lancement de Express
const app = express();

// cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

/**
 * Middlewares > bodyParser /
 */
// Usage de helmet pour protéger le header
app.use(helmet());

// Parse du body des requetes en json
app.use(bodyParser.json());

/**
 * Routes
 */

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
