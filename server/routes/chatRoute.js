const express = require('express');
const router = express.Router();
const {
    createChat,
    findSingleChat,
    findUserChats, 
    getAllChats
} = require('../controllers/chatController')

//get All chats 
router.get("/", getAllChats);
//create chat
router.post("/", createChat);

//find user chat 
router.get("/:userId", findUserChats);

//find single chat 
router.get("/find/:firstId/:secondId", findSingleChat);


module.exports = router; 