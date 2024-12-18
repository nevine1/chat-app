const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const validator = require('validator')
const registerNewUser = async (req, res) =>{
    
    try{

        const {name, email, password } = req.body; 
        let user = await User.findOne({email}); 

        if(user){
            return res.status(400).json({status: "fail", data: "this user is already registered"});
        }else{

            if(!name || !email || !password){
                return res.status(400).json({status: "fail", data: "this user is already registered"}); 
            }
            if(!validator.isEmail(email)){
                return res.status(400).json({status: "fail", data: "Email should be valid email ...."})
            }

            if(!validator.isStrongPassword(password)){
                return res.status(400).json({status: "fail", data: "Password should be strong ...."})
            }
            // hashing password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);
             user = await  new User({name, email, password: hashedPassword});
             user.save();
            return res.json(user);
        }
    }catch(err){
        return res.json({status: "error", code: 401, message:err.message})
    }
   
    
}

const getAllUsers = async (req, res) => {
    
    const users = await User.find({}, {
        "__v": false,
        "password": false,
        "updatedAt": false, //
        "createdAt": false
    });
    return res.json(users);
}

module.exports = {
    registerNewUser,
    getAllUsers
}