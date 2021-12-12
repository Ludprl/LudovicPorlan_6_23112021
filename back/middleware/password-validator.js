const passSchema = require("../models/password");

module.exports = (req, res, next) => {
    if (!passSchema.validate(req.body.password)) {
        res.status(400).json({
            message:
                "Votre mot de passe doit contenir au moins 8 caractères, contenir une majuscule, une minuscule et au moins 2 chiffres.",
        });
    } else {
        next();
    }
};
