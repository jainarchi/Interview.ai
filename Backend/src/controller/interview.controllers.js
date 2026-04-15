import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { generateInterviewReport } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

/**
 * @desc Generate Interview Report based on user's self description, resume and job description
 */
const generateInterviewReportController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const { jobDescription, selfDescription } = req.body;

    // replace multiple spaces with single space then trim
    const cleanText = (text) => text.replace(/\s+/g, " ").trim();

    if (!jobDescription || cleanText(jobDescription).length < 100) {
      return res.status(400).json({
        success: false,
        message: "Job description must be at least 100 characters",
      });
    }

    if (!selfDescription || cleanText(selfDescription).length < 100) {
      return res.status(400).json({
        success: false,
        message: "Self description must be at least 100 characters",
      });
    }

  // Parse PDF and extract text
    const data = await pdfParse(req.file.buffer);

    if (!data.text || data.text.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty PDF",
      });
    }

    // ai call to generate report with extracted text, job description and self description
    const interviewReport = await generateInterviewReport({
      resume: data.text,
      jobDescription,
      selfDescription,
    })

    // save report in database

   const newReport = await interviewReportModel.create({
      user: req.user.id,
      jobDescription,
      selfDescription,
      resume: data.text,
      ...interviewReport,
    });


    res.status(200).json({
      success: true,
      newReport
    });

  } catch (err) {
    console.error("ERROR :", err);

    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};





/**
 * @desc Get all interview reports of logged in user with only title and id of report
 */
const getAllInterviewReports = async (req, res) => {
  try {
    const reports = await interviewReportModel.find(
      { user: req.user.id } , 
      {title : 1 , _id : 1})
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (err) {
    console.error("ERROR :", err);

    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};


/**
 * @desc Get interview report by id
 */
const getInterviewReportById = async (req, res) => {
  try{
    const reportID = req.params.id
   
    // check for valid id 
    if(!reportID.match(/^[0-9a-fA-F]{24}$/)){
      return res.status(400).json({
        success : false ,
        message : 'Invalid report id'
      })
    }

    const report = await interviewReportModel.findById(reportID)

    if(!report){
      return res.status(404).json({
        success : false ,
        message : 'Report not found'
      })
    }

    if(report.user.toString() !== req.user.id.toString()){

      return res.status(401).json({
        success : false ,
        message : 'Report not found'
      })
    }

    res.status(200).json({
      success : true ,
      report
    })

  }
  catch (err) {
    console.error("ERROR :", err);

    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    })
  }

}


const deleteInterviewReport = async (req ,res ) =>{
  try{
   const reportID = req.params.id
   
     // check for valid id 
    if(!reportID.match(/^[0-9a-fA-F]{24}$/)){
      return res.status(400).json({
        success : false ,
        message : 'Invalid report id'
      })
    }

   const report = await interviewReportModel.findOneAndDelete({
     _id : reportID,
     user : req.user.id
  })

   if(!report){
     return res.status(404).json({
       success : false ,
       message : 'Report not found'
     })
   }

   res.status(200).json({
     success : true ,
     message : 'Report deleted successfully'
   })

  }
  catch(err){
    console.log(err)
    res.status(500).json({
      success : false ,
      message : 'Something went wrong'
    })


  }
}


export { 
  generateInterviewReportController, 
  getAllInterviewReports , 
  getInterviewReportById,
  deleteInterviewReport
 };