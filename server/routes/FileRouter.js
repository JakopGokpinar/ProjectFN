const express = require('express');
const router = express.Router();
//const uploadFiles = require('../middleware/upload.js');

const FileController = require('../controllers/FileController.js');

router.get("/", FileController.file);
router.post("/uploadimage", FileController.uploadImage)
router.get("/download", FileController.downloadFile);

module.exports = router;