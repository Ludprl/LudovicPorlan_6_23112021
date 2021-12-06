const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

// Connexion à la base de donnée
mongoose
    .connect(
        "mongodb+srv://Otucko:1DBCKXBg65nDwdOcuvk2@hottakespiquante.yuuks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
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

// Parse du body des requetes en json
app.use(bodyParser.json());

/**
 * Routes
 */

app.use("/api/auth", userRoutes);

module.exports = app;
