const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController')
router.get("/", userControllers.getAllUsers);

router.post("/register", userControllers.registerNewUser);

module.exports = router