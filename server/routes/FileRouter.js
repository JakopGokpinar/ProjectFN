const express = require('express');
const router = express.Router();

const FileController = require('../controllers/FileController.js');

router.get("/", FileController.file);
router.post("/uploadimage", FileController.uploadImage)
router.get("/download", FileController.downloadFile);
router.get("/image/:id", FileController.getImage);
router.get("/images", FileController.getImages);


module.exports = router;