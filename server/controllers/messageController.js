const express = require('express');

const Message = require('../models/messageModel');

//create new message
const createMessage = async(req, res) =>{
    const { chatId, senderId, text } = req.body;

    try{
        const newMessage =  new Message({chatId, senderId, text }); 
        const response = await newMessage.save();
        return res.status(200).json(response);

    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
}

//get messages
const findMessages = async(req, res) =>{
    const { chatId } = req.params;

    try{
        const messages = await Message.find({chatId})
        
        return res.status(200).json(messages)
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message})
    }
}


module.exports = {
    createMessage, 
    findMessages
}