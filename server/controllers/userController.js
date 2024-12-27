const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

//generating jwt token
const createToken = (_id) =>{
    const jwtKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtKey, {expiresIn: "3d"})
}


/* const registerNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
     
        console.log('request Data:', req.body);

        if (!name || !email || !password) {
            return res.status(400).json({ status: 'fail', data: 'All fields are required' });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ status: 'fail', data: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'fail', data: 'This user is already registered' });
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ status: 'fail', data: 'Password is too weak' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Create JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ status: 'success', data: { id: newUser._id, name, email, token } });

    } catch (err) {
        console.error('server registering error:', err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}; */


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
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        const secret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });
        return res.status(201).json({ token, user: {name: newUser.name, email: newUser.email } });
        
    } catch (error) {
        console.error('Registration Error:', error);  // Log the full error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



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

    const findUserById = async (req, res) =>{

        try{
            const id = req.params.id; 
            console.log(id)
            const user =  await User.findById(id); //
            return res.json(user)
        }catch(err){
            return res.status(401).json({message: err.message});
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