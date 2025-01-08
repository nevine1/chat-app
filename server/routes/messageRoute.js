const express = require('express');
const router = express.Router();
const { 
    createMessage, 
    findMessages
    } = require('../controllers/messageController')

router.post("/", createMessage)
    
router.get("/:chatId", findMessages);



module.exports = router;