const express = require('express');
const router = express.Router();
//const userControllers = require('../controllers/userController')
const {registerNewUser, loginUser,  getAllUsers} = require('../controllers/userController')
//router.get("/", userControllers.getAllUsers);
router.get("/", getAllUsers);

router.post("/register", registerNewUser);

router.get("/login", loginUser);

module.exports = router