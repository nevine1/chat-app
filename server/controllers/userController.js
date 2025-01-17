const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

//generating jwt token
const createToken = (_id) =>{
    const jwtKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtKey, {expiresIn: "3d"})
}


const registerNewUser = async (req, res) => {
    
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        
        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser =  new User({ name, email, password: hashedPassword });
        await newUser.save();
        const secret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });
        console.log(newUser)
        return res.status(201).json({ token, user: {name: newUser.name, email: newUser.email , password: newUser.password} });
        
    } catch (error) {
        console.error('Registration Error:', error);  // Log the full error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



const loginUser = async (req, res) =>{

    try{
        const { email, password } = req.body;
        

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        let user = await User.findOne({email});
        
        if(!user){
            
            return res.status(400).json({ message: "Invalid email or password ..." });

        }else{

            const validPassword = await bcrypt.compare(password, user.password);

            if(!validPassword){
                return res.status(400).json({ message: "This password is invalid" })
            }else{
                
                const token = await createToken(user._id);
                return res.status(200).json({_id: user._id, email, name: user.name, token})
            }

        }

    }catch(err){
        return res.json({status: "error", code: 401, message:err.message})
    }

    }

    const findUserById = async (req, res) =>{

        try{
            const id = req.params.id; 
           
            const user =  await User.findById(id); 

            if (!user) {
                return res.status(404).json({ error: "User not found" });
              }

            res.status(200).json({ user });
        }catch(err){
            console.error("Error fetching user:", err.message);
            res.status(500).json({ error: "Internal server error" });
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
    findUserById,
    getAllUsers
}