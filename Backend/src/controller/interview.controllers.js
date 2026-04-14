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

    if (!jobDescription || !selfDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description and self description are required",
      });
    }

    const data = await pdfParse(req.file.buffer);

    if (!data.text || data.text.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty PDF",
      });
    }

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