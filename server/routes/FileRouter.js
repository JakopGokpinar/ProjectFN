const express = require('express');
const router = express.Router();

const FileController = require('../controllers/FileController.js');

router.post("/uploadimage", FileController.uploadImage);
router.post("/uploadimages", FileController.uploadImages);
router.get("/download", FileController.downloadFile);
router.get("/image", FileController.getImage);
router.get("/annonce", FileController.getAnnonceImages);

module.exports = router;