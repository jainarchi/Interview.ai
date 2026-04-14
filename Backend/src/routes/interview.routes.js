import {Router} from 'express'
import { userAuth } from '../middleware/auth.middleware.js'
import { generateInterviewReportController } from '../controller/interview.controllers.js'
import {uploadMiddleware} from '../middleware/flile.middleware.js'

const router = Router()



/**
 * @route POST /api/interview
 * @desc Generate Interview Report based on user's self description, resume and job description
 * @access Private
 * @body resume , jobDescription , selfDescription
 */


router.post('/' , userAuth  , uploadMiddleware  ,generateInterviewReportController)




export default router