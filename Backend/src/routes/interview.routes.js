import {Router} from 'express'
import { userAuth } from '../middleware/auth.middleware.js'
import { generateInterviewReportController , getAllInterviewReports , getInterviewReportById , deleteInterviewReport} from '../controller/interview.controllers.js'
import {uploadMiddleware} from '../middleware/flile.middleware.js'

const router = Router()



/**
 * @route POST /api/interview
 * @desc Generate Interview Report based on user's self description, resume and job description
 * @access Private
 * @body resume , jobDescription , selfDescription
 */


router.post('/' , userAuth  , uploadMiddleware  ,generateInterviewReportController)

/**
 * @route GET /api/interview
 * @desc Get all interview reports of logged in user with only title and id of report
 * @access Private
 */

router.get('/' , userAuth , getAllInterviewReports)

/**
 * @route GET /api/interview/:id
 * @desc Get interview report by id
 * @access Private
 * @params id
 */

router.get('/report/:id' , userAuth , getInterviewReportById)


/**
 * @route DELETE /api/interview/:id
 * @desc Delete interview report by id
 * @access Private
 */

router.delete('/report/:id' , userAuth , deleteInterviewReport)


export default router