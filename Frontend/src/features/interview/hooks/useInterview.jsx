import {generateInterviewReport , getAllInterviewReports , getInterviewReport , deleteInterviewReport} from '../services/interview.api.js'
import { useContext } from 'react'
import { InterviewContext } from '../interviewContext.jsx'



export const useInterview = () => {
    const {loading , setLoading , report , setReport , reports , setReports} = useContext(InterviewContext)

   
    const handleGenerateReport = async ({jobDescription , selfDescription , resumeFile}) => {
        try {
            setLoading(true)
            const data = await generateInterviewReport({jobDescription , selfDescription , resumeFile})
            setReport(data.newReport)
            console.log('setting...')
            return data.newReport

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleGetAllReports = async () => {
        try {
            setLoading(true)
            const data = await getAllInterviewReports()
            setReports(data.reports)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    const handleGetReportById = async (id) => {
        try {
            setLoading(true)
            const data = await getInterviewReport(id)
            setReport(data.report)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


       const handleDeleteReport = async (id) => {
        try {
            await deleteInterviewReport(id)
            setReports(reports.filter(report => report._id !== id))

        } catch (err) {
            console.log(err)
        } 
       }  



    return{ 
        loading ,
        report ,
        reports ,
        handleGenerateReport,
        handleGetAllReports,
        handleGetReportById,
        handleDeleteReport
        
    
}
}