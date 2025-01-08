const Chat = require('../models/chatModel')


//createChat , we need both ids for sender and receiver chat messages
const createChat = async (req, res) => {

    const { firstId, secondId } = req.body;

    try{
        //first check if the chat is created  using first id and second id 
        const existingChat = await Chat.findOne({ 
            members: { $all : [ firstId, secondId ]}
        })

        if(existingChat) return res.status(200).json(existingChat);

        //if chat is not exist, create new chat  ad save it to database
        const newChat = new Chat({
            members: [ firstId, secondId ] });
            
        const response = await newChat.save();
        return res.status(200).json(response);
    }catch(err){
        console.log(error);
        return res.status(500).json(error)
    }
}

//findUserChat
const findUserChats = async (req, res) =>{
    const userId = req.params.userId;

    try{
        const chats = await Chat.find({
            members: { $in: [userId]}
        })
        
        return res.status(200).json(chats);

    }catch(err){
       console.log(err);
       return res.status(500).json(error) 
    }
}

//find chat 
const findSingleChat = async (req, res) =>{
    const {firstId, secondId} = req.params;

    try{

        const chat = Chat.find({
            members: { $all: [firstId, secondId] }
        })
        return res.status(200).json(chat)
    }catch(err){

        console.log(err);
        return res.status(500).json(err)
    }
}


module.exports = {
    createChat,
    findSingleChat,
    findUserChats
}


