const chatModel = require('../models/chatModel')


//createChat , we need both ids for sender and receiver chat messages
const createChat = async (req, res) => {

    const { firstId, secondId } = req.body;

    try{
        //first check if the chat is created  using first id and second id 
        const chat = await chatModel.findOne({ 
            members: { $all : [ firstId, secondId ]}
        })

        if(chat) return res.status(200).json(chat);

        //if chat is not exist, create new chat  ad save it to database
        const newChat = new chatModel({
            members: [ firstId, secondId ]
;        });
            
        const response = await newChat.save();
        return res.status(200).json(response);
    }catch(err){
        console.log(error);
        return res.status(500).json(error)
    }
}

//findUserChat
const findUserChat = async () =>{
    
}
//findChat

