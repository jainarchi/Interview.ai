import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { generateInterviewReport } from "../services/ai.service.js";

const generateInterviewReportController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // function based on pdf-parse to extract text from PDF buffer with stable version of pdf-parser

    const data = await pdfParse(req.file.buffer);   

    const report = await generateInterviewReport({
      resume: data.text,
      jobDescription: req.body.jobDescription,
      selfDescription: req.body.selfDescription,
    })


    res.status(200).json({
      success: true,
      report,
    });



  } catch (err) {
    console.error("PDF ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Error parsing PDF",
    });
  }
};

export { generateInterviewReportController };