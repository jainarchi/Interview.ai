import { validationResult , body , param } from "express-validator";

export const validateRequest = (req , res , next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({success : false , errors : errors.array()})
    }
    next()
}   

export const generateInterviewReportValidator = [
  body('jobDescription')
    .exists().withMessage('Job description is required')
    .isString().withMessage('Job description must be a string')
    .trim()
    .isLength({ min: 200, max: 2000 })
    .withMessage('Job description must be between 200 and 2000 characters'),

  body('selfDescription')
    .exists().withMessage('Self description is required')
    .isString().withMessage('Self description must be a string')
    .trim()
    .isLength({ min: 400, max: 800 })
    .withMessage('Self description must be between 400 and 800 characters'),

  validateRequest
];




export const mongooseIdValidator = [
  param("id")
    .exists().withMessage("Report ID is required")
    .isMongoId().withMessage("Invalid report ID format"),

  validateRequest,
];
 