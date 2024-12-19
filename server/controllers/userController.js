const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

//generating jwt token
const createToken = (_id) =>{
    const jwtKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtKey, {expiresIn: "3d"})
}

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

             const token = createToken(user._id);

            return res.status(200).json({status: "success", data:{ id: user._id, name, email, token}});
        }

    }catch(err){
        return res.json({status: "error", code: 401, message:err.message})
    }
   
    
}

const loginUser = async (req, res) =>{

    try{
        const { email, password } = req.body;
        let user = await User.findOne({email});

        if(!user){

            return res.status(400).json("Invalid email or password ...") 

        }else{

            const validPassword = await bcrypt.compare(password, user.password);

            if(!validPassword){
                return res.status(400).json("This password is invalid")
            }else{
                
                const token = await createToken(user._id);
                return res.status(200).json({_id: user._id, email, name: user.name, token})
            }

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
        "createdAt": false, 
        
    });
    return res.json(users);
}

module.exports = {
    registerNewUser,
    loginUser, 
    getAllUsers
}