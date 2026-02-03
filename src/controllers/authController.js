const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}

const register = async (req, res) => {
    try{
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all fields"
            })
        }

        if (!validator.isEmail(email)){
            return res.status(400).json({
                message: "Invalid email format"
            })
        }

        if (password.length < 6){
            return res.status(400).json({
                message: "Password is too short make a stronger password"
            })
        }

        const userExists = await User.findOne({email})

        if (userExists){
            return res.status(400).json({message: 'User already exists'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            username, 
            email, 
            password: hashedPassword
        })

        res.status(201).json({
            id: user._id,
            email: user.email
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const login = async (req, res) => {
    try{    
        const {email, password} = req.body

        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid password'})
        }

        res.json({
            id: user._id,
            token: generateToken(user._id)
        })
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


module.exports = { register, login }