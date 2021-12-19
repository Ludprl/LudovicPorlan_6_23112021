const Sauce = require("../models/sauce");
const fs = require("fs");

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(404).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

// Création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
        likes: 0,
        dislikes: 0,
        usersLiked: [" "],
        usersdisLiked: [" "],
    });
    sauce
        .save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
        .catch((error) => res.status(400).json({ error }));
};

// Mise à jour d'une sauce
exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file
        ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };

    Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
    )
        .then(res.status(200).json({ message: "Sauce modifiée" }))
        .catch((error) => res.status(400).json({ error }));
};

// Utilisation de unlike pour suppression
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(res.status(200).json({ message: "Sauce supprimée" }))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;

    switch (like) {
        case 1:
            // Si l'utilisateur n'a jamais like on incrémente
            Sauce.updateOne(
                { _id: sauceId },
                { $push: { usersLiked: userId }, $inc: { likes: +1 } }
            )
                .then(() => res.status(200).json({ message: "like" }))
                .catch((error) => res.status(400).json({ error }));

            break;

        case 0:
            // Si l'utilisateur a déjà like on décrémente
            Sauce.findOne({ _id: sauceId })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne(
                            { _id: sauceId },
                            {
                                $pull: { usersLiked: userId },
                                $inc: { likes: -1 },
                            }
                        )
                            .then(() =>
                                res.status(200).json({ message: "nothing" })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    }
                    // Si l'utilisateur n'a jamais dislike on décrémente
                    if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne(
                            { _id: sauceId },
                            {
                                $pull: { usersDisliked: userId },
                                $inc: { dislikes: -1 },
                            }
                        )
                            .then(() =>
                                res.status(200).json({ message: "nothing" })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    }
                })
                .catch((error) => res.status(404).json({ error }));
            break;

        case -1:
            // Si l'utilisateur n'a jamais dislike on incrémente
            Sauce.updateOne(
                { _id: sauceId },
                { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
            )
                .then(() => {
                    res.status(200).json({ message: "dislike" });
                })
                .catch((error) => res.status(400).json({ error }));
            break;

        default:
            console.log(error);
    }
};
