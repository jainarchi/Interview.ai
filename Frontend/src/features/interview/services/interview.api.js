import axios from "axios";


const api = axios.create({
    baseURL: '',
    withCredentials: true,
})


export async function generateInterviewReport ({jobDescription , selfDescription , resumeFile}) {
    const formData = new FormData()
    formData.append('jobDescription' , jobDescription)
    formData.append('selfDescription' , selfDescription)
    formData.append('resumeFile' , resumeFile)

    try {
    const response = await api.post('/api/interview' , formData , {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data

    } catch (err) {
        console.log(err)
        
    }
}


export async function getAllInterviewReports(){
    try {
        const response = await api.get('/api/interview')
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function getInterviewReport(id){
    try {
        const response = await api.get(`/api/interview/report/${id}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function deleteInterviewReport(id) {
    try{
        const response = await api.delete(`/api/interview/report/${id}`)
        return response.data
        
    }
    catch(err){
        console.log(err)
    }
} 
