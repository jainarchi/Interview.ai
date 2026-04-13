import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import {appConfig} from "../config/config.js";
import {blacklistToken} from "../config/cache.js";



const tokenInResponse = async (user , res , statusCode , message) => {
    const token = jwt.sign(
        {id : user._id} , 
        appConfig.jwtSecret , 
        {expiresIn : '7d'}
    )

    const cookieOptions = {
        expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ,
        httpOnly : true ,
        secure : appConfig.nodeEnv === 'production' ,
        sameSite : appConfig.nodeEnv === 'production' ? 'none' : 'lax'
    }
     
    user.password = undefined

    res.cookie('token' , token , cookieOptions)

    res.status(statusCode).json({
        success : true ,
        message , 
        user : {
            id : user._id ,
            username : user.username ,
            email : user.email
        }  
    })
}

// Register a new user
 
 const register = async (req , res) => {
    const {username , email , password} = req.body
    try {
        const userExists = await userModel.findOne({
            $or : [
                {username} , {email}
            ]
        })

        if(userExists ){
            return res.status(400)
            .json({
                message : 'Username or email already exists'
            })
        }

        const user = await userModel.create({
            username , email , password
        })

        await tokenInResponse(user , res , 201 , 'Registered successfully')
       
    }
    catch (error) {
        console.error('Error in register controller : ' , error)
        res.status(500).json({
            success : false ,
            message : 'Server error'
        })
    }


}


// Login user and return JWT token
 const login = async (req , res) =>{
   const {email , password} = req.body

   try{
    const user  = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(400).json({
            success : false ,
            message : 'Invalid credentials'
        })
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(400).json({
            success : false ,
            message : 'Invalid credentials'
        })
     }

     await tokenInResponse(user , res , 200 , 'Login successful')
   }
   catch (error) {
    res.status(500).json({
        success : false ,
        message : 'Server error'
    })
   }
}



// Logout user by clearing the token cookie

 const logout = async (req , res) => {

    try{
    const token = req.cookies.token

    const nowInSec = Math.floor(Date.now() / 1000);
    const remainingTTL = req.user.exp - nowInSec;
 
    if (remainingTTL > 0) {
      await blacklistToken(token, remainingTTL);
    }
    
    
    res.clearCookie('token')

    res.status(200).json({
        success : true ,
        message : 'Logged out successfully'
    })

}catch (error) {
    console.log(error)
    res.status(500).json({
        success : false ,
        message : 'Server error'
    })
}

}


// Get current logged in user details

 const getMe = async (req , res) => {
    try{
        const user = await userModel.findById(req.user.id)

        if(!user){
            return res.status(404).json({
                success : false ,
                message : 'User not found'
            })
        }

        res.status(200).json({
            success : true ,
            user :{
                id : user._id ,
                username : user.username ,
                email : user.email
            }
        })
    }
    catch (error) {
        res.status(500).json({
            success : false ,
            message : 'Server error'
        })
    }


}




export {register , login , logout , getMe}