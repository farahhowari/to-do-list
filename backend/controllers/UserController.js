const mongoose = require('mongoose');
const User= require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require ('dotenv').config()
const SECRET_KEY=process.env.SECRET_KEY


exports.getAllUsers=async(req,res)=>{
    try {
        const users=await User.find()
        res.status(200).json(users)
    } catch (error) {
     res.status(500).json({message:error.message})
    }



}
exports.createuser=async(req,res)=>{
    const{name,email,password,role}=req.body
    try {
        const newUser = new User({ name, email, password,role }); 
        const savedUser = await newUser.save();    
      res.status(200).json(savedUser)  
    } catch (error) {
        res.status (500).json({message:error.message})
    }
    }
 exports.UpdateUserByID=async(req , res)=>{
   
    try {
        const {id} =req.params
        const {name ,email,password,role}=req.body  
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send ('id not valid')
        }
        const UserToUpdate=await User.findByIdAndUpdate(id,{name,email,password,role})
    if(!UserToUpdate){
        res.status(404).json({message:'user not found '})
    }else{
        res.status(200).json({message:"User Updated Successfully"})
    }
    }


     catch (error) {
        res.status(500).json({message:error.message}) 
    }
 }
 exports.deleteUserById =async (req,res)=>{
    const {id} =req.params 
    const{name,email,password}=req.body
    try {
 const userTodelete= await User.findByIdAndDelete(id,{name,email,password,role})
    res.status(200).json({message:"User Deleted successfully"})

    }
 catch (error) {
        res.status (500).json({message:error.message})
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userID: user._id }, SECRET_KEY, { expiresIn: '24h' });

        return res.status(200).json({
            message: "User logged in successfully",
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.auth = async (req, res, next) => {
    const token = req.header('Auth'); 
    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next(); 
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};