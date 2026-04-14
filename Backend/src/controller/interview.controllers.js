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
    const report = await generateInterviewReport({
      resume: data.text,
      jobDescription,
      selfDescription,
    })

    // console.log("Generated Report:", report)

    res.status(200).json({
      success: true,
      report,
    });

  } catch (err) {
    console.error("ERROR :", err);

    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};


export { generateInterviewReportController };