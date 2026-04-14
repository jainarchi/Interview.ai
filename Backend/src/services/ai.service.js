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

export const normalizeAIResponse = (raw) => {

  // Fix broken JSON arrays like ["{", "question...", "}"]
  const fixBrokenArray = (arr) => {
  if (!Array.isArray(arr)) return [];

  const result = [];
  let current = {};

  for (let item of arr) {
    item = item.trim();

    if (item === "{") {
      current = {};
      continue;
    }

    if (item === "}") {
      result.push(current);
      current = {};
      continue;
    }

    // parse key-value manually
    const match = item.match(/(\w+)\":\s*\"(.+)\"/);

    if (match) {
      const key = match[1];
      const value = match[2];
      current[key] = value;
    }
  }

  return result;
};

  const normalizeQA = (arr) => {
    return arr.map((q) => ({
      question: q.question || "",
      intension: q.intension || "",
      answer: q.answer || q.answer_key || "",
    }));
  };

  const normalizeSkills = (arr) => {
    return arr.map((s) => ({
      skill: s.skill || "",
      severity: (s.severity || "low").toLowerCase(),
    }));
  };


  const technical = fixBrokenArray(raw.technical_questions);
  const behavioral = fixBrokenArray(raw.behavioral_questions);
  const skills = fixBrokenArray(raw.skill_gaps);
  const plan = fixBrokenArray(raw.preparation_plan);




  return {
    matchScore: typeof raw.match_score === "string"
      ? parseInt(raw.match_score)
      : raw.match_score || 0,

    technicalQuestions: normalizeQA(technical),

    behavioralQuestions: normalizeQA(behavioral),

    skillGaps: normalizeSkills(skills),

    preparationPlan: plan,

    title: raw.job_role || raw.title || "Interview Report",
  };
};


 const sampleResponse = {
    "success": true,
    "report": {
        "candidate_name": "Archi Jain",
        "job_role": "Full Stack Web Developer Intern",
        "company_name": "Dexter’s Tech",
        "match_score": 95,
        "technical_questions": [
            "{",
            "question\": \"Explain the difference between SQL and NoSQL databases, specifically focusing on why you chose MongoDB for your SkillSphere project.\",",
             "intension\": \"To assess the candidate's understanding of database architecture and their ability to justify technology choices.\",",
            "answer_key\": \"SQL is relational with fixed schemas, while NoSQL is document-based and schema-less. For SkillSphere, MongoDB was chosen because quiz data and user profiles can vary in structure, and JSON-like documents align perfectly with the JavaScript-heavy stack.\"",
            "}",
            "{",
            "question\": \"How do you handle authentication and authorization in a MERN application using JWT?\",",
             "intension\": \"To evaluate security knowledge and practical implementation of state-less authentication.\",",
            "answer_key\": \"Upon login, the server generates a JWT signed with a secret key. This token is sent to the client and stored (e.g., in localStorage or HttpOnly cookies). For protected routes, the client sends the token in the Authorization header. The server verifies it using middleware before granting access.\"",
            "}",
            "{",
            "question\": \"In your InfraAI project, how did you implement real-time word-by-word streaming using Gemini API?\",",
             "intension\": \"To test hands-on experience with AI integration and asynchronous data handling.\",",
            "answer_key\": \"I used the Gemini API’s streaming capability and leveraged Socket.IO or Server-Sent Events (SSE) to push data chunks to the frontend as they were generated, rather than waiting for the entire response to be ready.\"",
            "}",
            "{",
            "question\": \"What are the advantages of using React Hooks like useMemo and useCallback?\",",
             "intension\": \"To assess frontend performance optimization skills.\",",
            "answer_key\": \"useMemo memoizes the result of a calculation to prevent expensive re-computations on every render. useCallback memoizes the function instance itself to prevent unnecessary re-renders of child components that depend on function props.\"",
            "}"
        ],
        "behavioral_questions": [
            "{",
            "question\": \"Tell me about a time you encountered a significant bug during development. How did you resolve it?\",",
             "intension\": \"To evaluate problem-solving skills and technical resilience.\",",
            "answer_key\": \"The candidate should describe a specific issue (e.g., JWT token blacklisting or Socket.IO sync issues), explain the debugging process using tools like Postman or VS Code debugger, and the final resolution.\"",
            "}",
            "{",
            "question\": \"How do you stay updated with the latest trends in web development and AI?\",",
             "intension\": \"To gauge the candidate's passion for continuous learning, which is a core value at Dexter's Tech.\",",
            "answer_key\": \"Mentioning specific resources like tech blogs, GitHub repositories, official documentation for LangChain/Gemini, or participating in coding marathons like the one at Sheryians.\"",
            "}"
        ],
        "skill_gaps": [
            "{",
            "skill\": \"Testing Frameworks (Jest, Mocha)\",",
            "severity\": \"Medium\"",
            "}",
            "{",
            "skill\": \"Cloud Deployment (AWS, Heroku, or Vercel pipeline configuration)\",",
            "severity\": \"Low\"",
            "}",
            "{",
            "skill\": \"Advanced CSS Animation Libraries (Framer Motion)\",",
            "severity\": \"Low\"",
            "}"
        ],
        "preparation_plan": [
            "{",
            "day\": 1,",
            "focus\": \"JavaScript & React Core\",",
            "topics\": [\"ES6+ Features\", \"Closures\", \"Event Loop\", \"React Component Lifecycle\", \"Virtual DOM\"],",
            "activities\": \"Review basic to advanced JS questions. Refactor a small part of SkillSphere to use advanced hooks.\"",
            "}",
            "{",
            "day\": 2,",
            "focus\": \"Backend & Security\",",
            "topics\": [\"Node.js Architecture\", \"Express Middleware\", \"JWT Authentication\", \"Token Blacklisting\"],",
            "activities\": \"Re-read the implementation details of authentication in InfraAI. Practice writing custom Express middlewares.\"",
            "}",
            "{",
            "day\": 3,",
            "focus\": \"Database & AI Integration\",",
            "topics\": [\"MongoDB Aggregation\", \"Indexing\", \"LangChain basics\", \"Vector Stores\"],",
            "activities\": \"Explore how Tavily search and Gemini were integrated in InfraAI. Practice complex MongoDB queries.\"",
            "}",
            "{",
            "day\": 4,",
            "focus\": \"DSA & Logic Building\",",
            "topics\": [\"Arrays\", \"Strings\", \"Linked Lists\", \"Basic Dynamic Programming\"],",
            "activities\": \"Solve top 10 most-asked interview questions on LeetCode related to MERN developer roles.\"",
            "}",
            "{",
            "day\": 5,",
            "focus\": \"Frontend Styling & Responsive Design\",",
            "topics\": [\"Tailwind CSS best practices\", \"SCSS Mixins\", \"Responsive layouts\"],",
            "activities\": \"Ensure all project demos are perfectly responsive on mobile devices. Review CSS Flexbox and Grid.\"",
            "}",
            "{",
            "day\": 6,",
            "focus\": \"Mock Interviews & Behavioral Prep\",",
            "topics\": [\"STAR Method\", \"Project Walkthroughs\", \"Company Research\"],",
            "activities\": \"Record yourself explaining your projects. Research Dexter's Tech's recent work and prepare 3 questions to ask the interviewer.\"",
            "}"
        ]
    }
}

export async function generateInterviewReport({
  resume,
  jobDescription,
  selfDescription,
}) {
  const prompt = `Generate an Interview Report for the following details that help the candidate prepare for the interview effectively. The report should include a match score, technical and behavioral questions with their "intension and answer keys, skill gaps with their severity, and a day-wise preparation plan target to job role. :

        Candidate's Resume:${resume}

        Job Description:${jobDescription}

        Candidate's Self Description:${selfDescription} `;



    // const response = await ai.models.generateContent({
    //     model: "gemini-3-flash-preview",
    //     contents: prompt,
    //     config: {
    //     responseMimeType: "application/json",
    //     responseSchema: zodToJsonSchema(interviewReportSchema),
    //     },
    // });
   
  //  const raw = JSON.parse(response.text);
   
  
   const cleanData = normalizeAIResponse(sampleResponse.report);
    console.log(cleanData)
   return cleanData;
}

