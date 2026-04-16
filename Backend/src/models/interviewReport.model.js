import mongoose from "mongoose";


const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String ,
        required : [true , 'Question is required']
    } ,
    intension :{
        type : String ,
        required : [true , 'Intension of interviewer is required']
    },
    answer : {
        type : String ,
        required : [true , 'Answer is required']
    }
} , { 
    _id : false 
})




const behavioralQuestionSchema = new mongoose.Schema({
    question : {
        type : String ,
        required : [true , 'Question is required']
    } ,
    intension :{
        type : String ,
        required : [true , 'Intension of interviewer is required']
    },    
    answer : {
        type : String ,
        required : [true , 'Answer is required']
    }
} , { 
    _id : false 
})




const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String ,
        required : [true , 'Skill is required']
    } ,
    severity : {
        type : String ,
        enum : ['low' , 'medium' , 'high'] ,
        required : [true , 'Severity is required']
    }
} , {
    _id : false 
})





const preparationPlanSchema = new mongoose.Schema({
    day : {
        type : Number ,
        // required : [true , 'Day is required']
    } ,
    focus : {
        type : String ,
        required : [true , 'focus is required']
    },
    tasks : {
        type : String
    },
    activities : {
        type : String
    }
}, {
    _id : false
})





const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String ,
        required : true,
        trim : true
    } ,
    resume : {
        type : String ,
    },
    selfDescription : {
        type : String ,
        required : true ,
        trim : true
    } ,
    title:{
        type : String ,
        required : [true , 'Title is required']
    },
    matchScore :{
        type : Number ,
        required : true,
        min: 0,
        max: 100
    } ,
    technicalQuestions : [technicalQuestionSchema] ,
    behavioralQuestions : [behavioralQuestionSchema] ,
    skillGaps : [skillGapSchema] ,
    preparationPlan : [preparationPlanSchema] ,
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'user' ,
        required : true
    }
} , { timestamps : true })
    




const interviewReportModel = mongoose.model('interviewReport' , interviewReportSchema)

export default interviewReportModel