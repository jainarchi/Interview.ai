import jwt from 'jsonwebtoken'
import { appConfig } from '../config/config.js'
import { isTokenBlacklisted } from '../config/cache.js'


export const userAuth = async (req , res , next) => {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            success : false ,
            message : 'token not found'
        })
    }
    

    const isBlacklisted = await isTokenBlacklisted(token)
    if(isBlacklisted){
        return res.status(401).json({
            success : false ,
            message : 'Invalid token'
        })
    }

    try{
        const decoded = jwt.verify(token , appConfig.jwtSecret)
        req.user = decoded 
        next()

    }
    catch (err) {
        return res.status(401).json({
            success : false ,
            message : 'Invalid token'
        })
    }

}