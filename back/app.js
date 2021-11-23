const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connexion à la base de donnée
mongoose
    .connect(
        "mongodb+srv://Otucko:1DBCKXBg65nDwdOcuvk2@hottakespiquante.yuuks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
    console.log("Requête reçue !");
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !" });
    next();
});

app.use((req, res, next) => {
    console.log("Réponse envoyée avec succès !");
});

module.exports = app;
