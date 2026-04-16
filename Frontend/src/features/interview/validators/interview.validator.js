import { z } from 'zod';



const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_FILE_TYPES = ['application/pdf'];




const resumeFileSchema = z
  .instanceof(File)
  .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
    message: 'Only PDF files are allowed',
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: 'File size must be less than 3MB',
  });


const jobDescriptionSchema = z
  .string()
  .trim()
  .min(1, 'Job description is required')
  .min(200, 'Job description must be at least 200 characters')
  .max(2000, 'Job description must not exceed 2000 characters');



const selfDescriptionSchema = z
  .string()
  .trim()
  .min(1, 'Self description is required')
  .min(50, 'Self description must be at least 50 characters')
  .max(200, 'Self description must not exceed 200 characters');




export const interviewFormSchema = z.object({
  jobDescription: jobDescriptionSchema,
  selfDescription: selfDescriptionSchema,
  resumeFile: resumeFileSchema,
});


export const validateInterviewForm = (formData) => {
  try {
    const validatedData = interviewFormSchema.parse(formData);

    return {
      success: true,
      data: validatedData,
      errors: {},
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};

      (error.issues || []).forEach((err) => {
        const field = err.path?.[0] || 'form';

        if (!errors[field]) {
          errors[field] = err.message;
        }
      });

      return {
        success: false,
        data: null,
        errors,
      };
    }

    return {
      success: false,
      data: null,
      errors: { form: 'Validation failed' },
    };
  }
};