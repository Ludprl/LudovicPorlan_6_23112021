const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Sign up avec mdp crypté

exports.signup = (req, res, next) => {
    bcrypt
        // Hash du mot de pass par 10. Plus ce chiffre est grand plus le mdp est sécurisé.
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() =>
                    res.status(201).json({ message: "Utilisateur créé !" })
                )
                .catch((error) =>
                    res.status(400).json({
                        message:
                            "Cette adresse email est utilisée par un autre compte.",
                    })
                );
        })
        .catch((error) => res.status(500).json({ error }));
};

// login de l'utilisateur.
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Utilisateur non trouvé !" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: "Mot de passe incorrect !" });
                    }
                    // fonction sign pour encoder une nouveau token.
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.APP_TOKEN,
                            {
                                // Validité du token
                                expiresIn: "24h",
                            }
                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
