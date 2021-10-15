const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController.js');

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/checklogin", UserController.checklogin);
router.get("/logout", UserController.logout);
router.get("/myannonces", UserController.getMyAnnonces);
router.post("/newannonce", UserController.createAnnonce);
module.exports = router;