const express = require("express");
const router = express.Router();
const multer = require("../middleware/multerConfig");
const auth = require("../middleware/auth");

const sauceManager = require("../controllers/sauce");

router.get("/", auth, sauceManager.getAllSauces);
router.get("/:id", auth, sauceManager.getOneSauce);
router.post("/", auth, multer, sauceManager.createSauce);
router.put("/:id", auth, multer, sauceManager.updateSauce);
router.delete("/:id", auth, sauceManager.deleteSauce);
router.post("/:id/like", auth, sauceManager.likeSauce);

module.exports = router;
