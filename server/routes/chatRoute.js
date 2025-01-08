const express = require('express');
const router = express.Router();
const {
    createChat,
    findSingleChat,
    findUserChats
} = require('../controllers/chatController')

//create chat
router.post("/", createChat);

//find user chat 
router.get("/:userId", findUserChats);

//find single chat 
router.get("/find/:firstId/:secondId", findSingleChat);


module.exports = router; 