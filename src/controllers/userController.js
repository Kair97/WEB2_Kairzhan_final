const User = require('../models/User')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const getProfile = (req, res) => {
    res.json(req.user)
}

const updateProfile = async(req, res, next) => {
    try{

        const user = await User.findById(req.user._id)

        if (!user) {
            res.status(404)
            throw new Error('User not found')
        }
        
        user.username = req.body.username || user.username

        if (req.body.email){
            if (validator.isEmail(req.body.email)){
                user.email = req.body.email
            }else{
                res.status(400)
                throw new Error('Invalid format of email')
            }
        }

        if (req.body.password) {
            if (req.body.password.length < 6) {
                res.status(400)
                throw new Error('Password length is too short make it better for your safety')
            }
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(req.body.password, salt)

        }

        await user.save()

        res.status(200).json({message: "Profile updated"})

    }catch(error){
        next(error)
    }
}

module.exports = { getProfile, updateProfile }