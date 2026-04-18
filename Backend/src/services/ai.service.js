import { appConfig } from "../config/config.js";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";



const ai = new GoogleGenAI({
  apiKey: appConfig.geminiApiKey,
});



const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

const normalizeAIResponse = (raw) => {
  return {
    matchScore:
      raw.matchScore ??
      raw.match_score ??
      0,

    title:
      raw.title ??
      raw.job_title ??
      "Interview Report",

    technicalQuestions:
      raw.technicalQuestions ??
      raw.technical_questions_and_keys ??
      [],

    behavioralQuestions:
      raw.behavioralQuestions ??
      raw.behavioral_questions_and_keys ??
      [],

    skillGaps:
      raw.skillGaps ??
      raw.skill_gaps ??
      [],

    preparationPlan:
      raw.preparationPlan ??
      raw.preparation_plan ??
      [],
  };
};

 async function generateInterviewReport({
  resume,
  jobDescription,
  selfDescription,
}) {
  const prompt = `Generate an Interview Report for the following details that help the candidate prepare for the interview effectively. The report should include a match score, technical and behavioral questions with their "intension and answer keys, skill gaps with their severity, and a day-wise preparation plan target to job role. 
  MUST FOLLOW -
  Return ONLY valid JSON.
  Use EXACT field names:
  matchScore, title, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan.
  Do NOT use snake_case.
  Do NOT rename fields.
  Ensure arrays contain objects, not strings.

        Candidate's Resume:${resume}

        Job Description:${jobDescription}

        Candidate's Self Description:${selfDescription} `;



    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });
   
   const raw = response.text
   console.log(response.text)


  //  const normalized = normalizeAIResponse(raw);
  //  console.log('normalized data -----------------------------' , normalized)
   
   return response.text;
}




// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//     const prompt = `Generate an interview report for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
// `

//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         }
//     })
//    console.log(response.text)
//     return JSON.parse(response.text)
    


// }


export { generateInterviewReport }