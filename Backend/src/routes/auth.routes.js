import {Router} from 'express';
import {register , login , logout , getMe} from '../controller/auth.controllers.js';
import {userAuth} from '../middleware/auth.middleware.js';
import {registerValidation , loginValidation} from '../validator/auth.validator.js';


const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register' , registerValidation , register )

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 */

router.post('/login' , loginValidation , login )


/**
 * @route POST /api/auth/logout
 * @desc Logout user by clearing the token cookie
 * @access Private  
 */


router.post('/logout' , userAuth, logout )


/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
 */


router.get('/get-me' , userAuth , getMe)







export default router;