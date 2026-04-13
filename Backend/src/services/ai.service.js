import { appConfig } from "../config/config.js";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";



const ai = new GoogleGenAI({
  apiKey: appConfig.geminiApiKey,
});



const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job requirements",
    ),

  technicalQuestions: z
    .array(
      z.string({
        questions: z
          .array()
          .describe("The Technical questions can be asked in the interview"),
        intension: z
          .string()
          .describe(
            "The intension of the interviewer behind asking the question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),

  behavioralQuestions: z
    .array(
      z.string({
        questions: z
          .array()
          .describe("The Behavioral questions can be asked in the interview"),
        intension: z
          .string()
          .describe(
            "The intension of the interviewer behind asking the question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),

  skillGaps: z
    .array(
      z.string({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),

  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});







export async function generateInterviewReport({
  resume,
  jobDescription,
  selfDescription,
}) {
  const prompt = `Generate an Interview Report for the following details that help the candidate prepare for the interview effectively. The report should include a match score, technical and behavioral questions with their intention and how to answer them, skill gaps with their severity, and a day-wise preparation plan.:

        Candidate's Resume:${resume}

        Job Description:${jobDescription}

        Candidate's Self Description:${selfDescription} `;



    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
        config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });


  //  console.log(JSON.parse(response.text));
   return JSON.parse(response.text);
}


