const express = require('express');
const router = express.Router();

//const userControllers = require('../controllers/userController')
const {
    registerNewUser, 
    loginUser,  
    getAllUsers, 
    findUserById} = require('../controllers/userController');

//router.get("/", userControllers.getAllUsers);
router.get("/", getAllUsers);

router.post("/register", registerNewUser); 
router.post("/login", loginUser); 

// Catch All Dynamic Routes (GET)
router.get("/:id", findUserById);

module.exports = router;