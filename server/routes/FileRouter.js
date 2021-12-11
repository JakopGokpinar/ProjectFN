const express = require('express');
const router = express.Router();

const FileController = require('../controllers/FileController.js');

router.post("/uploadimages", FileController.uploadImages);
router.get("/image", FileController.getImage);
router.get("/annonce", FileController.getAnnonceImages);
router.post("/createannonce", FileController.createAnnonce);

module.exports = router;